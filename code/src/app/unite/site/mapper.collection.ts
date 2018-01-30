
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
    "personal":
    {
        'personal' : {
            'fname' : 'firstName',
            'lname' : 'lastName',
            'img' : 'avatar',
            'username' : 'loginId',
            'lastLogin' : 'lastLogin'
        }
    },
    "address":
    {
        'iconlist' : {
            'image_url' : '',
            'caption' : 'addType',
            'description1' :'addressLine1',
            'description2' :'addressLine2'
        }
    },
    "education":
    {
        'iconlist' : {
            'image_url' : '',
            'caption' : 'degree',
            'description1' :'grade',
            'description2' :'boardOrUniversity'
        }
    },
    "experience":
    {
        'iconlist' : {
            'image_url' : '',
            'caption' : 'jobName',
            'description1' :'orgName',
            'description2' :'role'
        }
    },
    "summary":
    {
        'divider' : {
            'description' : '',
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