from django.urls import path
from . import views

urlpatterns = [
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboard.as_view()),
    path('teacher-login', views.teacher_login),
    path('pages/', views.FlatPagesList.as_view()),
    path('pages/<int:pk>/<str:page_slug>/', views.FlatPagesDetail.as_view()),
    path('contact/', views.ContactList.as_view()),
    path('faq/', views.FaqList.as_view()),
    path('category/', views. CategoryList.as_view()), 
    # Course
    path('course/',views.CourseList.as_view()),
    # Course Detail
    path('course/<int:pk>/', views.CourseDetailView.as_view()),
    # Specific Course Chapter
    path('chapter/',views.ChapterList.as_view()),
    path('chapter/<int:pk>',views.ChapterDetailView.as_view()),
    # Specific Chapter
    path ('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    # Teacher Courses
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    # Course Detail  
    path( 'teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),
    # Student
    path('student/', views. StudentList.as_view()),
    path('student/dashboard/<int:pk>/', views.StudentDashboard.as_view()),
    path('student-login', views.student_login),

    path('student-enroll-course/', views. StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>', views.fetch_favorite_status),

    path('fetch-all-enrolled-students/<int:teacher_id>',views. EnrolledStudentList.as_view() ),
    path('fetch-enrolled-students/<int:course_id>',views. EnrolledStudentList.as_view() ),
    path('fetch-enrolled-courses/<int:student_id>',views. EnrolledStudentList.as_view() ),
    path('fetch-favorite-courses/<int:student_id>',views. StudentFavoriteCourseList.as_view() ),

    path('fetch-recommended-courses/<int:studentId>',views. CourseList.as_view() ),
    path('student-add-favorite-course/',views. StudentFavoriteCourseList.as_view() ),
     path('student-remove-favorite-course/<int:course_id>/<int:student_id>',views. remove_favorite_course),
    path ('course-rating/<int:course_id>', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('student-assignment/<int:teacher_id>/<int:student_id>',views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>',views.MyAssignmentList.as_view()),
    path('update-assignment/<int:pk>',views.UpdateAssignment.as_view()),
    path('student/change-password/<int:student_id>/', views.student_change_password),


]