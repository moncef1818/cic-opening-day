from django.db import models

class ClubMember(models.Model):

    DEPARTMENT_CHOICES = [
        ('cybersec', 'Cybersecurity'),
        ('dev', 'Development'),
        ('eth','Ethical hacking'),
        ('ai', 'Artificial Intelligence'),
        ('design', 'Design and Social media'),
        ('hr', 'Human Recourses'),
        ('fpr', 'finance and public relations'),
        ('logistics', 'Logistics'),
        ('vib','Vibes'),
        
    ]
    
    YEAR_CHOICES = [
        ('1', 'First Year'),
        ('2', 'Second Year'),
        ('3', 'Third Year'),
        ('4', 'Fourth Year'),
        ('5', 'Fifth Year'),
    ]
    
    # Personal Info
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    discord = models.CharField(max_length=100, blank=True)
    
    # Academic Info
    school = models.CharField(max_length=200)
    year = models.CharField(max_length=1, choices=YEAR_CHOICES)
    
    # Department Preferences
    department_choice_1 = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    department_choice_2 = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    why_department_1 = models.TextField(help_text="Why did you choose your first department?")
    why_not_department_1_choose_2 = models.TextField(
        blank=True,
        help_text="If not accepted to department 1, why department 2?"
    )
    
    # Metadata
    registered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-registered_at']
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"
