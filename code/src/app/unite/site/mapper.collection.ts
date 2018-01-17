
export const factoryMapper =
{
    "countries" : 
        {
            'list' : {},
            'grid' : {
                'name' : 'timezones.0',
                'img' : 'flag',
                'desc' : 'translations.es'
            },
            'carousel' : {
                'image_url' : 'flag',
                'caption' : 'name',
                'description' :''
            }
        },

    "profile" : 
        {
            'progressbar' : {
                'title' : '',
                'percentage' : '',
            }
        },
    "personal":
    {
        'personal' : {
            'fname' : 'firstName',
            'lname' : 'lastName',
            'img' : 'avatar',
            'username' : 'userName',
            'dob' : 'dob'
        },
        'grid' : {
            'img' : '',
            'name' : 'lastName',
            'desc' :'loginId'
        }
    },
    "address":
    {
        'blog' : {
            'image_url' : '',
            'title' : 'name',
            'description' :''
        }
    },
    "tjlms-courses":
    {
        'carousel' : {
                'image_url' : 'course_image',
                'caption' : 'course_title',
                'description' :'course_description'
        },
        'iconlist' : {
            'image_url' : 'course_image',
            'caption' : 'course_title',
            'description' :'course_description'
        },
        'grid' : {
            'img' : 'course_image',
            'name' : 'course_title',
            'desc' :'course_description'
        }
    }
}