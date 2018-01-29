
export const factoryMapper =
{
    "countries" : 
        {
            'list' : {},
            'grid' : {
                'name' : 'timezones.0',
                'img' : 'flag',
                'desc' : 'translations.es',
                'metaLeft' : '',
                'metaRight':  ''
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
            'desc' :'loginId',
            'metaLeft' : '',
            'metaRight':  ''
            
        },
        'iconlist' : {
            'image_url' : '',
            'caption' : 'addressLine2',
            'description' :'city'
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
            'desc' :'course_description',
            'metaLeft' : '',
            'metaRight':  ''
        }
    },
    "ek-lessons":
    {
        'grid' : {
            'img' : 'appIcon',
            'name' : 'name',
            'desc' :'description',
            'metaLeft' : 'language.0',
            'metaRight':  'createdBy'
            }
    },
    "sb-graph" :
    {
        "linechart" : {
            "dataset" : "graphData",
            "label" : "label"
        }
    }
}