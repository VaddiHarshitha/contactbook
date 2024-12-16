from django.shortcuts import render
from rest_framework import viewsets
from django.core.paginator import Paginator
from .models import contacts
from django.http import JsonResponse
from .serializers import Contactserializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes,api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
# Create your views here.

class Contactgetpost(APIView):
    authentication_classes=[BasicAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self,request):
        contact=contacts.objects.all()
        serializer=Contactserializer(contact,many=True)
        return Response(serializer.data)
    

    def post(self,request):
        serializer=Contactserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class Contactdetail(APIView):
    authentication_classes=[BasicAuthentication]
    permission_classes=[IsAuthenticated]

    def get_object(self,pk):
        try:
            return contacts.objects.get(pk=pk)
        except contacts.DoesNotExist:
            raise ObjectDoesNotExist
    def get(self,request,pk):
        contact=self.get_object(pk)
        serializer=Contactserializer(contact)
        return Response(serializer.data)
    
    def put(self,request,pk):
        contact=self.get_object(pk)
        serializer=Contactserializer(contact,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        contact=self.get_object(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#search functionality
def search_contacts(request):
    query=request.GET.get('query','')
    page=int(request.GET.get('page',1))
    page_size=int(request.GET.get('page_size',10))
    sort_order=request.GET.get('sort_order','asc')

    if query:
        search_contact=contacts.objects.filter(first_name__icontains=query) | contacts.objects.filter(last_name__icontains=query) | contacts.objects.filter(phone_number__icontains=query)
    else:
        search_contact=contacts.objects.all()
    
    
    if sort_order == 'asc':
        search_contact=search_contact.order_by('first_name')
    else:
        search_contact=search_contact.order_by('-first_name')
    #pagination
    paginator=Paginator(search_contact,page_size)
    page_obj=paginator.get_page(page)


    contact_list=list(page_obj.object_list.values('first_name','last_name','phone_number'))

    response_data={
        'contacts':contact_list,
        'page':page,
        'page_size':page_size,
        'total_pages':paginator.num_pages,
        'total_contacts':paginator.count,
    }
    #contact_list=list(search_contact.values('first_name','last_name','phone_number'))
    return JsonResponse(response_data)#safe=False