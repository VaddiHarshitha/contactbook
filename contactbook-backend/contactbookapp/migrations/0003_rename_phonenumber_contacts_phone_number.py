# Generated by Django 5.0.2 on 2024-12-13 11:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contactbookapp', '0002_alter_contacts_first_name_alter_contacts_last_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contacts',
            old_name='phonenumber',
            new_name='phone_number',
        ),
    ]