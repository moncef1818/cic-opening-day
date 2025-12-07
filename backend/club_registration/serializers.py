from rest_framework import serializers
from .models import ClubMember

class ClubMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubMember
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'discord',
            'school',
            'year',
            'department_choice_1',
            'department_choice_2',
            'department_choice_3',
            'why_department_1',
            'why_not_department_1_choose_2',
            'registered_at',
            'why_not_department_1_and_2_choose_3'
        ]

    read_only_fields = ['id','registered_at']

    def validate_email(self ,value):
        value = value.lower()
        if ClubMember.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "This email is already registered for the club!"
            )
        return value
    
    def validate(selv, data):
        dept1 = data.get('department_choice_1')
        dept2 = data.get('department_choice_2')
        dept3 = data.get('department_choice_3')

        if (dept1 == dept2):
            raise serializers.ValidationError({
                'department_choice_2': 'Second department choice must be different from first!'
            })
        if (dept1 == dept3):
            raise serializers.ValidationError({
                'department_choice_3': 'Third department choice must be different from first!'
            })
        if (dept2 == dept3):
            raise serializers.ValidationError({
                'department_choice_3': 'Third department choice must be different from second!'
            })
        return data
    