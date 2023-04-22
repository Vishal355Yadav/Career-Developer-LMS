from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model=models.Teacher
		fields=['id','full_name','email','password','qualification','mobile_no','skills','teacher_courses','skill_list'] 
	# def __init__(self, *args,** kwargs):
	# 	super (CourseRatingSerializer, self).__init__(*args,**kwargs)
	# 	request = self.context.get ('request')
	# 	self.Meta.depth = 0
	# 	if request and request.method == 'GET':
	# 		self.Meta.depth = 1
		depth=1

class TeacherDashboardSerializer(serializers.ModelSerializer):
	class Meta:
		model=models.Teacher
		fields=['total_teacher_courses','total_teacher_chapters','total_teacher_students'] 

class FlatPagesSerializer(serializers.ModelSerializer):
	class Meta:
		model=FlatPage
		fields=['id','title','content','url']

class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model=models.Contact
		fields=['id','full_name','email','query_txt']

class FAQSerializer(serializers.ModelSerializer):
	class Meta:
		model=models.FAQ
		fields=['id','question','answer']

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model=models.CourseCategory
		fields=['id','title','description']

class CourseSerializer(serializers.ModelSerializer): 
	class Meta:
		model=models.Course
		fields= ['id', 'category', 'teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list','total_enrolled_students','course_rating']
		depth=1

class ChapterSerializer(serializers.ModelSerializer):
	class Meta:
		model=models.Chapter
		fields= ['id','course','title','description', 'video','remarks']

class StudentSerializer(serializers.ModelSerializer):
	class Meta: 
		model=models.Student
		fields=['id', 'full_name', 'email', 'password','username','interested_categories']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment
        fields =['id', 'course', 'student','enrolled_time']
    def __init__ (self,*args,**kwargs):
        super (StudentCourseEnrollSerializer, self). __init__ (*args, **kwargs)
        request = self.context.get ('request')
        self.Meta.depth = 0
        if request and request.method =='GET':
            self.Meta.depth = 2 
	    
class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentFavoriteCourse
        fields =['id', 'course', 'student','status']
    def __init__ (self,*args,**kwargs):
        super (StudentFavoriteCourseSerializer, self). __init__ (*args, **kwargs)
        request = self.context.get ('request')
        self.Meta.depth = 0
        if request and request.method =='GET':
            self.Meta.depth = 2 

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseRating
        fields=['id', 'course','student', 'rating', 'reviews', 'review_time']

    def __init__(self, *args,** kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get ('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
