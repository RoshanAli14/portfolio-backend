const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// @route   POST /api/contact/send
// @desc    Send contact form message
// @access  Public
router.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, email, message)'
            });
        }

        // Email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Create message in database
        const newMessage = new Message({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            status: 'pending'
        });

        // Save to database
        await newMessage.save();
        console.log(`📝 Message saved to database from: ${email}`);

        // Prepare professional email template
        const mailOptions = {
            // Attempting to show customer email as direct sender
            from: `"${name}" <${email}>`,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email,
            subject: `New Inquiry from ${name}: ${email}`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b; line-height: 1.6;">
                    <div style="background-color: #1e293b; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 1px;">New Portfolio Inquiry</h1>
                    </div>
                    
                    <div style="background-color: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                        <div style="margin-bottom: 30px;">
                            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Contact Information</h2>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="padding: 5px 0; color: #64748b; width: 80px;"><strong>Name:</strong></td>
                                    <td style="padding: 5px 0;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #64748b;"><strong>Email:</strong></td>
                                    <td style="padding: 5px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <h2 style="font-size: 14px; color: #64748b; text-transform: uppercase; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Message</h2>
                            <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; color: #334155; font-style: italic; border-left: 4px solid #4f46e5;">
                                "${message}"
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 40px;">
                            <a href="mailto:${email}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Reply to Contact</a>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Sent via Portfolio Identity Service</p>
                    </div>
                </div>
            `
        };

        // Send email
        const recipient = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;
        if (!recipient) {
            throw new Error('No recipient email configured (RECIPIENT_EMAIL or EMAIL_USER)');
        }

        mailOptions.to = recipient;

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent successfully to: ${recipient}`);

        // Update message status
        newMessage.status = 'sent';
        newMessage.emailSent = true;
        await newMessage.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.',
            data: {
                id: newMessage._id,
                timestamp: newMessage.createdAt
            }
        });

    } catch (error) {
        console.error('❌ Error in contact route:', error);

        // Update message status to failed if it exists
        if (error.messageId) {
            await Message.findByIdAndUpdate(error.messageId, { status: 'failed' });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again or email me directly.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/contact/test
// @desc    Test endpoint
// @access  Public
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Contact API is working!',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
