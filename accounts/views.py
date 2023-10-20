from accounts.models import User
from wwmgroup.models import WwmGroup,Invite

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .forms import RegisterForm

import json

# 그룹리스트 전달하는 뷰
# 유저가 속한 그룹들 찾기 - 그룹 이름, 그룹원 출력
@csrf_exempt
def user_grouplist(request):
    if request.method == "GET":
        return render(request,"wwmgroup/list.html")
    else:
        req = json.loads(request.body)
        res = {
            "groups" : []
        }
        user = request.user

        #내 그룹
        if req["type"] == "myGroup":
            queries = WwmGroup.objects.filter(user = user)
            for query in queries:
                e = {}
                group = query
                print(group)
                e["name"] = group.groupname
                e["startDate"] = group.startdate
                e["endDate"] = group.enddate

                res["groups"].append(e)

        # 초대받은 그룹
        else:
            email = user.email
            queries = Invite.objects.filter(email = email)
            for query in queries:
                e = {}
                group = query.group

                e["name"] = group.groupname
                e["startDate"] = group.startdate
                e["endDate"] = group.enddate

                res["groups"].append(e)
        return JsonResponse(status = 200,data = res)

# user avaliablity_days_time 조회하는 뷰 (시작일을 name = startdate 로 받아야됨)
def post_personal_timetable(request):
    user = User.objects.get(id='1')
    start = find_start(request.POST.get('startdate'))
    timetable = user.avaliablity_days_time
    timetable = timetable[start * 24:] + timetable[:start * 24]

    context = {
        'timetable': timetable,  # string 형으로 반환
        'startdate': start,  # index
    }
    return render(request, 'test.html', context)


# 2-2. 시작 요일 구하는 view
# - 숫자 return 0(월), 1(화), 2(수) …  
# [python에서 datetime  불러와서 요일 구하는 로직] : https://ddolcat.tistory.com/688
def find_start(date):
    return date.weekday()


# 로그인 함수
def login(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        print(request)
        if form.is_valid():
            user = form.save()
            user.save()
        return render(request, 'accounts/my_page.html')
    else:
        form = RegisterForm()
        return render(request, 'accounts/login.html', {'form': form})

# 마이페이지 처음 화면
def home(request) :
    if request.user.is_authenticated:
        return render(request ,'accounts/home.html')
    else:
        return render(request,"accounts/main_page.html")
