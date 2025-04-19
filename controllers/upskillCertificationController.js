const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all courses
exports.getAllCourse = async (req, res) => {
  try {
    console.log('Fetching all upskill certification courses');
    const courses = await prisma.upskillCertification.findMany();
    
    return res.status(200).json({
      success: true,
      data: courses,
      message: "All Courses Rendered successfully"
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the courses",
      error: error.message
    });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log('Fetching course with ID:', courseId);
    
    const course = await prisma.upskillCertification.findUnique({
      where: { certificationId: courseId }
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
      message: "Course rendered by ID"
    });
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the course",
      error: error.message
    });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    console.log('Creating new course with data:', courseData);
    
    if (!courseData.course || !courseData.type || !courseData.price) {
      return res.status(400).json({
        success: false,
        message: "Course name, type, and price are required"
      });
    }

    const newCourse = await prisma.upskillCertification.create({
      data: courseData
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message
    });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseData = req.body;
    
    console.log('Updating course with ID:', courseId, 'Data:', courseData);

    const existingCourse = await prisma.upskillCertification.findUnique({
      where: { certificationId: courseId }
    });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const updatedCourse = await prisma.upskillCertification.update({
      where: { certificationId: courseId },
      data: courseData
    });

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully"
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to update the course",
      error: error.message
    });
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log('Deleting course with ID:', courseId);
    
    const existingCourse = await prisma.upskillCertification.findUnique({
      where: { certificationId: courseId }
    });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    await prisma.upskillCertification.delete({
      where: { certificationId: courseId }
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete the course",
      error: error.message
    });
  }
};