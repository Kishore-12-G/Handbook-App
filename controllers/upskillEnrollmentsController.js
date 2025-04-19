const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.CreateEnrollments = async (req, res) => {
    try {
        const { certificationId, name, email, phone, description, userId } = req.body;

        if (!certificationId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Certification Id and User Id are required'
            });
        }

        // Correct certification check - using upskillCertification model
        const certification = await prisma.upskillCertification.findUnique({
            where: { certificationId: certificationId }
        });

        if (!certification) {
            return res.status(404).json({ success: false, message: 'Certification not found' });
        }

        const user = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Using correct model name: UpSkillEnrollment (case-sensitive)
        const enrollment = await prisma.upSkillEnrollment.create({
            data: { 
                certificationId, 
                name, 
                email, 
                phone, 
                description, 
                userId,
                verificationStatus: 'PENDING', // required enum
                interestStatus: 'PENDING'    // required enum
            }
        });

        return res.status(201).json({ 
            success: true, 
            data: enrollment, 
            message: 'Course enrollment successful' 
        });

    } catch (error) {
        console.error('Enrollment creation error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to create enrollment', 
            error: error.message 
        });
    }
};

// Update other functions to use correct model name:

exports.getEnrollmentsById = async (req, res) => {
    try {
        const { applicationId } = req.params; // Changed from enrollmentId to applicationId

        console.log('Looking for enrollment with ID:', applicationId);

        const enrollment = await prisma.upSkillEnrollment.findUnique({
            where: { 
                applicationId: applicationId 
            },
            include: {
                certification: true,
                user: true
            }
        });

        if (!enrollment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Enrollment not found' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: enrollment, 
            message: 'Enrollment fetched successfully' 
        });

    } catch (error) {
        console.error('Get enrollment error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve the course enrollment', 
            error: error.message 
        });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const updateData = req.body;

        const enrollment = await prisma.upSkillEnrollment.findUnique({
            where: { applicationId: enrollmentId }
        });

        if (!enrollment) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }

        const updatedEnrollment = await prisma.upSkillEnrollment.update({
            where: { applicationId: enrollmentId },
            data: updateData
        });

        return res.status(200).json({ 
            success: true, 
            data: updatedEnrollment, 
            message: 'Enrollment updated successfully' 
        });
    } catch (error) {
        console.error('Update enrollment error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to update the enrollment', 
            error: error.message 
        });
    }
};

exports.getUserEnrollments = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const enrollments = await prisma.upSkillEnrollment.findMany({
            where: { userId: userId },
            include: {
                certification: true
            }
        });

        return res.status(200).json({ 
            success: true, 
            data: enrollments, 
            message: 'User enrollments fetched successfully' 
        });

    } catch (error) {
        console.error('Get user enrollments error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve the courses enrolled', 
            error: error.message 
        });
    }
};