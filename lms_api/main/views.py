from django.shortcuts import render
from webbrowser import get
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from django.contrib.flatpages.models import FlatPage
from .serializers import TeacherSerializer,FlatPagesSerializer,ContactSerializer,FAQSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollSerializer,CourseRatingSerializer,StudentFavoriteCourseSerializer,TeacherDashboardSerializer,StudentAssignmentSerializer,StudentDashboardSerializer,NotificationSerializer,QuizSerializer,QuestionSerializer,CourseQuizSerializer

from . import models
from django.db.models import Q


class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer

class TeacherList(generics.ListCreateAPIView):
	queryset=models.Teacher.objects.all()
	serializer_class = TeacherSerializer
	# permissions_classes=[permissions.IsAuthenticated]
def get_queryset(self):
    if 'popular' in self.request.GET:
        sql="SELECT *, COUNT(c.id) as total_courses FROM main_teacher as t INNER JOIN main_courses as c ON c.teacher_id=t.id GROUP BY t.id ORDER BY total_course desc"
        return models.Teacher.objects.raw(sql)

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset=models.Teacher.objects.all()
	serializer_class = TeacherSerializer
	permissions_classes=[permissions.IsAuthenticated]

@csrf_exempt
def teacher_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        teacherData=models.Teacher.objects.get(email=email,password=password)
    except models.Teacher.DoesNotExist:
        teacherData=None    
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id})

    else:
        return JsonResponse({'bool':False})

class FlatPagesList(generics.ListCreateAPIView):
	queryset=FlatPage.objects.all()
	serializer_class = FlatPagesSerializer

class FlatPagesDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset=FlatPage.objects.all()
	serializer_class = FlatPagesSerializer

class ContactList(generics.ListCreateAPIView):
	queryset=models.Contact.objects.all()
	serializer_class = ContactSerializer

class FaqList(generics.ListCreateAPIView):
	queryset=models.FAQ.objects.all()
	serializer_class = FAQSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset=models.CourseCategory.objects.all()
    serializer_class=CategorySerializer

# Course
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    def get_queryset(self):
        qs=super() .get_queryset()
        if  'result'  in self. request.GET:
            limit=int(self.request.GET[ 'result' ])
            qs=models.Course.objects.all().order_by('-id') [:limit]
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=models.Course.objects.filter(techs__icontains=category)
        if  'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self. request.GET[ 'skill_name' ]
            teacher=self.request.GET['teacher']
            teacher=models.Teacher.objects.filter(id=teacher).first()
            qs=models.Course.objects.filter(techs__icontains=skill_name, teacher=teacher)
        elif 'studentId' in self.kwargs:
            student_id=self.kwargs['studentId']
            student=models.Student.objects.get(pk=student_id)
            print(student.interested_categories)
            queries= [Q(techs__iendswith=value) for value in student.interested_categories]
            query=queries.pop()
            for item in queries:
                query |=item
            qs=models.Course.objects.filter(query)
            return qs
        return qs
        
class CourseDetailView(generics.RetrieveAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializer
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get (pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

# Specific Teacher Course
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class = ChapterSerializer


class CourseChapterList(generics.ListAPIView):
    # queryset=models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    def get_queryset(self):
        course_id=self.kwargs[ 'course_id']
        course = models.Course.objects.get(pk=course_id)
        return  models. Chapter.objects.filter (course=course)
        
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer

#Student Data
class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
# permission classes=[permissions.IsAuthenticated]

class StudentDashboard(generics.RetrieveAPIView):
    queryset=models.Student.objects.all()
    serializer_class = StudentDashboardSerializer

@csrf_exempt
def student_login(request):
    email=request.POST['email']
    password=request.POST['password']

    try:
        studentData=models.Student.objects.get(email=email,password=password)
    except models.Student.DoesNotExist:
         studentData=None

    if studentData:
        return JsonResponse({'bool':True,'student_id':studentData.id})

    else:
        return JsonResponse({'bool':False})

class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavoriteCourse.objects.all()
    serializer_class=StudentFavoriteCourseSerializer
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()


def remove_favorite_course(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

def fetch_favorite_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    if favoriteStatus and favoriteStatus.status==True:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

def fetch_enroll_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})


class EnrolledStudentList(generics.ListAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course = models.Course.objects.get (pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher=models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()

class CourseRatingList(generics.ListCreateAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc LIMIT 4"
            return models.CourseRating.objects.raw(sql)

        if 'all' in self.request.GET:
            sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc"
            return models.CourseRating.objects.raw(sql)    
        
    
def fetch_rating_status (request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

@csrf_exempt
def teacher_change_password(request,teacher_id):
    password=request.POST['password']

    try:
        teacherData=models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None

    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})

    else:
        return JsonResponse({'bool':False})

class AssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignment.objects.all()
    serializer_class=StudentAssignmentSerializer   

    def get_queryset(self):
        student_id=self.kwargs[ 'student_id']
        teacher_id=self.kwargs[ 'teacher_id']
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return  models.StudentAssignment .objects.filter (student=student , teacher=teacher)

class MyAssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignment.objects.all()
    serializer_class=StudentAssignmentSerializer   

    def get_queryset(self):
        student_id=self.kwargs[ 'student_id']
        student = models.Student.objects.get(pk=student_id)
        models.Notification.objects.filter(student=student,notif_for='student',notif_subject='asssignment').update(notifiread_status=True)
        return  models.StudentAssignment .objects.filter (student=student)
                
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudentAssignment.objects.all()
    serializer_class=StudentAssignmentSerializer   

@csrf_exempt
def student_change_password(request,student_id):
    password=request.POST['password']

    try:
        studentData=models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData=None

    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})

    else:
        return JsonResponse({'bool':False})    

class NotificationList(generics.ListCreateAPIView):
    queryset=models.Notification.objects.all()
    serializer_class=NotificationSerializer   

    def get_queryset(self):
        student_id=self.kwargs[ 'student_id']
        student = models.Student.objects.get(pk=student_id)
        return  models.Notification.objects.filter (student=student,notif_for='student',notif_subject='assignment',notifiread_status=False)

class QuizList(generics.ListCreateAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer

class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class=QuizSerializer
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get (pk=teacher_id)
        return models.Quiz.objects.filter(teacher=teacher)

class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer        

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer

class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    def get_queryset(self):
        quiz_id=self.kwargs[ 'quiz_id']
        quiz = models.Quiz.objects.get(pk=quiz_id)
        return  models. QuizQuestions.objects.filter (quiz=quiz)

class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)

def fetch_quiz_assign_status(request,quiz_id,course_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


def update_view(request,course_id):
    queryset=models.Course.objects.filter(pk=course_id).first()
    queryset.course_views+=1
    queryset.save()
    return JsonResponse({'views':queryset.course_views})