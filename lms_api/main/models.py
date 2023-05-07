from django.db import models
from django.core import serializers
# import moviepy.editor

# Create your models here.
class Teacher(models.Model):
	full_name=models.CharField(max_length=100)
	email=models.CharField(max_length=100)
	password=models.CharField(max_length=100,blank=True,null=True)
	qualification=models.CharField(max_length=100)
	mobile_no=models.CharField(max_length=100)
	profile_img=models.ImageField(upload_to='teacher_img/',null=True)
	skills= models.TextField()

	class Meta:
		verbose_name_plural="01. Teachers"
	def skill_list(self):
		skill_list=self.skills.split(',')
		return skill_list

	def total_teacher_courses (self):
		total_courses=Course.objects.filter(teacher=self).count()
		return total_courses

	def total_teacher_chapters (self):
		total_chapters=Chapter.objects.filter(course__teacher=self).count()
		return total_chapters

	def total_teacher_students (self):
		total_students=StudentCourseEnrollment.objects.filter(course__teacher=self).count()
		return total_students

class CourseCategory(models.Model):
	title=models.CharField(max_length=100)
	description=models.TextField()

	class Meta:
		verbose_name_plural="02. Course Categories"
	
	def __str__(self):
		return self.title

class Course(models.Model):
	category=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
	teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE,related_name='teacher_courses')
	title=models.CharField(max_length=100)
	description=models.TextField()
	featured_img=models.ImageField(upload_to='course_imgs/',null=True)
	techs=models.TextField(null=True)
	course_views=models.BigIntegerField(default=0)

	class Meta:
		verbose_name_plural="03. Courses"

	def related_videos (self):
		related_videos=Course.objects.filter(techs__icontains=self.techs)
		return serializers.serialize('json', related_videos)
	def tech_list(self):
		tech_list=self.techs.split(',')
		return tech_list
	def total_enrolled_students(self):
		total_enrolled_students=StudentCourseEnrollment.objects.filter(course=self).count()	
		return total_enrolled_students
	def course_rating(self):
		course_rating=CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))	
		return course_rating['avg_rating']
	def __str__(self):
		return self.title	

class Student(models.Model):
	full_name=models.CharField(max_length=100)
	email=models.CharField(max_length=100)
	password=models.CharField(max_length=100)
	username=models.CharField(max_length=100)
	interested_categories=models.TextField()

	def __str__(self):
		return self.full_name

	def enrolled_courses (self):
		enrolled_courses=StudentCourseEnrollment.objects.filter(student=self).count()
		return enrolled_courses

	def favorite_courses (self):
		favorite_courses=StudentFavoriteCourse.objects.filter(student=self).count()
		return favorite_courses

	def complete_assignments (self):
		complete_assignments=StudentAssignment.objects.filter(student=self,student_status=False).count()
		return complete_assignments	

	def Pending_assignments (self):
		Pending_assignments=StudentAssignment.objects.filter(student=self,student_status=False).count()
		return Pending_assignments			

	class Meta:
		verbose_name_plural="04. Students"

class Notification(models.Model):
	teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
	student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
	notif_subject=models.CharField(max_length=100,verbose_name='Notification subject',null=True)
	notif_for=models.CharField(max_length=100,verbose_name='Notification for',null=True)
	notif_created_time=models.DateTimeField(auto_now_add=True)
	notifiread_status=models.BooleanField(default=False,verbose_name='Notification status')

	class Meta:
		verbose_name_plural="05. Notifications"

class Contact(models.Model):
	full_name=models.CharField(max_length=100)
	email=models.EmailField()
	query_txt=models.TextField()
	add_time=models.DateTimeField(auto_now_add=True)

	def __str__(self) -> str:
		return self.query_txt

	class Meta:
		verbose_name_plural="06. Contact Queries"

class FAQ(models.Model):
	question=models.CharField(max_length=100)
	answer=models.TextField()

	def __str__(self) -> str:
		return self.question

	class Meta:
		verbose_name_plural="07. Faq"

class Chapter (models.Model):
	course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')
	title=models.CharField(max_length=150)
	description=models. TextField()
	video=models.FileField(upload_to='chapter_videos/', null=True)
	remarks=models.TextField(null=True )

	class Meta:
		verbose_name_plural="08. Chapters"

	def chapter_duration( self):
		seconds=0
		import cv2
		cap = cv2. VideoCapture(self.video.path)
		fps = cap.get (cv2.CAP_PROP_FPS)
	# OpenCV2 version 2 used "CV CAP PROP FPS"
		frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
		if frame_count:
			duration = frame_count/fps
			print('fps =' + str(fps))
			print ('number of frames ='+ str(frame_count))
			print ('duration (S) ='+ str(duration))
			minutes = int (duration/60)
			seconds = duration%60
			print('duration (M:S) =' +str(minutes) + ':' + str(seconds))
			return seconds

class StudentCourseEnrollment(models.Model):
	course=models.ForeignKey(Course, on_delete=models.CASCADE,related_name='enrolled_courses')
	student=models.ForeignKey(Student, on_delete=models.CASCADE,related_name='enrolled_student')
	enrolled_time=models.DateTimeField(auto_now_add=True)
	class Meta:
		verbose_name_plural="09. Enrolled Courses"
	def __str__(self):
		return f"{self.course} - {self.student}"

class StudentFavoriteCourse(models.Model):
	course=models.ForeignKey(Course, on_delete=models.CASCADE)
	student=models.ForeignKey(Student, on_delete=models.CASCADE)
	status=models.BooleanField(default=False)
	class Meta:
		verbose_name_plural="11. Student Favorite Courses"
	def __str__(self):
		return f"{self.course} - {self.student}"

class CourseRating(models.Model) :
	course=models.ForeignKey(Course, on_delete=models.CASCADE,null=True)
	student=models.ForeignKey(Student, on_delete=models.CASCADE,null=True)
	rating=models.PositiveBigIntegerField(default=0)
	reviews=models.TextField(null=True)
	review_time=models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name_plural="10. Course Ratings"

	def __str__(self):
		return f"{self.course} - {self.student} - {self.rating}"

class StudentAssignment(models.Model) :
	student=models.ForeignKey(Student, on_delete=models.CASCADE,null=True)
	teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE,null=True)
	title=models.CharField(max_length=200)
	detail=models.TextField(null=True)
	student_status=models.BooleanField(default=False,null=True)
	add_time=models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name_plural="12. Student Assignment"

	def __str__(self):
		return f"{title}"		

class Quiz(models.Model):
	teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE,null=True)
	title=models.CharField(max_length=200)
	detail=models.TextField(null=True)
	add_time=models.DateTimeField(auto_now_add=True)
	
	def assign_status(self):
		return CourseQuiz.objects.filter(quiz=self).count()

	class Meta:
		verbose_name_plural="13. Quiz"
	

class QuizQuestions(models.Model):
	quiz=models.ForeignKey(Quiz, on_delete=models.CASCADE,null=True)
	questions=models.CharField(max_length=200)
	ans1=models.CharField(max_length=200)
	ans2=models.CharField(max_length=200)
	ans3=models.CharField(max_length=200)
	ans4=models.CharField(max_length=200)
	right_ans=models.CharField(max_length=200)
	add_time=models.DateTimeField(auto_now_add=True)
	class Meta:
		verbose_name_plural="15. Quiz Questions"

class CourseQuiz(models.Model):
	teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
	course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
	quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
	add_time=models.DateTimeField(auto_now_add=True)
	class Meta:
		verbose_name_plural="14. Course Quiz"
