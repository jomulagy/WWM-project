from django import forms
from wwmgroup.models import WwmGroup


class groupForm(forms.ModelForm):
    class Meta:
        model = WwmGroup
        fields = ['groupName', 'desc', 'startdate', 'enddate', 'leader_email']
