from contextlib import redirect_stderr
from django.shortcuts import render
from django.utils.dateformat import DateFormat
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from wwmgroup.models import WwmGroup
from accounts.models import User
from datetime import timedelta, datetime
import json
from .models import Timetable

def post_group_timetable(request,pk):
    if request.method == 'GET':
        date = []
        group = WwmGroup.objects.get(pk=pk)
        user_list = group.user.all()  

        start_date = group.startdate
        end_date = group.enddate
        day_count = (end_date - start_date).days + 1
        for single_date in (start_date + timedelta(n) for n in range(day_count)):
            date.append(str(single_date))
        user_count = len([user for user in group.user.all()])
        timetable = create_group_timetable(pk,start_date,end_date)
        result = get_result(timetable,user_count)
        context = {
            'user_list': user_list, 
            'groupname': group.groupname,
            'timetable' : timetable, #리스트 형이며 리스트의 요소는 안되는사람의 이름들의 리스트임
            'startdate' : str(start_date), 
            'enddate' : str(end_date),
            'date' : date, 
            'result_list' : result,
            'result_count' : user_count - len(timetable[result[0]]),
            'user_count' : user_count,
            "wwmgroupurl": group.wwmgroupurl,
            "laeder_email": group.leader_email,
            "user_email": request.user.email,
        }
        return render(request,'whenmeet/index.html',context)
# 1-2. 개인타임 테이블 뿌리는 view -> 시작일을 name = startdate 로 받아야됨
def post_personal_timetable(request):
    user = request.user
    
    weekdays = ['월','화','수','목','금','토','일']
    if not user.timetable_set.all().exists():
            for weekday in weekdays:
                new = Timetable(user = request.user,day = weekday,schedule = "0"*24)
                new.save()
    res = {}
    for weekday in weekdays:
        res[weekday]=list(user.timetable_set.get(day = weekday).schedule)
        print(res[weekday])

    print(res)
    context = {
            'timetable' : res,
    }

    return render(request,'whenmeet/mytimetable.html',context)
# 2-1. 그룹원들 타임 테이블 취합하는 view 
# - wwmgroup modeld의 avaliablity_cal_length 속성 사용 
# - 유저의 avaliablity_days_time가 일주일 기준으로 월요일부터 총 24글자씩이라고 가정
# - 유저의 avaliablity_days_time을 24씩 분리해서 wwmGroup의 시작요일과 매칭해서 24시간씩 비교 
def create_group_timetable(group_id,start_date,end_date):
    timetable = []
    cur_date = start_date
    print(type(cur_date))
    group = WwmGroup.objects.get(id = group_id)

    members = group.user.all()
    print(members)
    timetables = []
    while cur_date <= end_date:
        timetable = [[] for i in range(24)]
        for member in members:
            schedule = member.timetable_set.get(day = get_weekday(cur_date)).schedule
            schedule = list(map(int,list(schedule)))

            for i in range(24):
                if schedule[i]:
                    timetable[i].append(member.last_name+member.first_name)
            print(timetable)
        for sche in timetable:
            timetables.append(sche)
        cur_date += timedelta(days=1)
    print(timetables)
    return timetables

@csrf_exempt
def edit_personal_timetable(request):
    weekdays = ['월', '화', '수', '목', '금', '토', '일']

    if request.method == 'POST':
        user = request.user
        req = json.loads(request.body)
        for weekday in weekdays:
            data = user.timetable_set.get(day = weekday)
            data.schedule = "".join(req[weekday])
            data.save()

        return JsonResponse(status = 200,data = {})
    else:
        return JsonResponse(status=405,data={"message":"Method Not Allowed"})


# 2-2. 시작 요일 구하는 view
# - 숫자 return 0(월), 1(화), 2(수) …  
# [python에서 datetime  불러와서 요일 구하는 로직] : https://ddolcat.tistory.com/688
def get_weekday(date):
    weekdays = ['월', '화', '수', '목', '금', '토', '일']
    return weekdays[date.weekday()]



def get_result(timetable,count):
    max_len = 0
    result = []
    for i in range(len(timetable)):
        if(max_len<len(timetable[i])):
            result = []
            result.append(i)
            max_len = len(timetable[i])
        elif max_len == len(timetable[i]):
            result.append(i)
    return result
