**NOTE: These instructions are installing this barebones starter from scratch.**

---

### Downloads

Make sure you have PHP, Composer, Laravel Valet, mySQL, and gatsby-cli installed beforehand.

Head to the *[Valet docs](https://laravel.com/docs/master/valet)* for the first three (you need *[Homebrew](https://brew.sh/)* to get PHP). mySQL can be installed *[here](https://dev.mysql.com/downloads/mysql/)* and gatsby-cli is installed using npm `npm install -g gatsby-cli`.

---

### Intro
* Install a new Gatsby project first `gatsby new project-name`
* cd into your project `cd project-name`
* Install Craft `composer create-project craftcms/craft`
* cd into Craft `cd craft`

### Database
* Start your mySQL database if it isn’t already started
* Create a database

> I recommend using *[TablePlus](https://tableplus.io/)* to connect to your new database and create your database. I always keep mySQL databases encrypted on my own machine keep this in mind when connecting and entering your credentials

* Locate your .env file in craft and add your credentials and database name to the file

### Valet
* While still in the `/craft` directory
* Start valet using `valet start`
* Then link the directory to valet using `valet link`
* Install Craft - head to your browser at `craft.test/index.php?p=admin/install`

### Craft CMS
* Settings <span>&#x27F6;</span> Create a new section called ‘Posts’
* Settings <span>&#x27F6;</span> Fields <span>&#x27F6;</span> +New field
	* Name: “post content”
	* Handle is automatically generated
	* Instructions “Place your content here”
	* Field Type “Plain text”
* Entries <span>&#x27F6;</span> +New entry
* Create two or three posts
* Head back to your editor
* Under craft/templates remove index.html
* Create a new file called `index.twig`
```
<!DOCTYPE html>
<html>
    <head>
        <title>Blog</title>
    </head>
    <body>
        <div>
            {% set entryQuery = craft.entries()
                .section('posts') %}

            {# Execute the query and get the results #}
            {% set entries = entryQuery.all() %}

            {# Display the entries #}
            {% for entry in entries %}
                <article>
                    <h1>{{ entry.title }}</h1>
                    <p>{{ entry.postContent }}</p>
                </article>
            {% endfor %}
        </div>
    </body>
</html>
```
_This is a very basic template, just to display the data you have currently in your CMS_

### CraftQL
* Make sure you are in the craft directory `cd craft`
* Install CraftQL using composer
* `composer require markhuot/craftql:^1.0.0`
* Settings <span>&#x27F6;</span> Plugins <span>&#x27F6;</span> CraftQL Settings <span>&#x27F6;</span> Install <span>&#x27F6;</span> Enable
* After it’s enabled head back to Settings
* Enter CraftQL settings and scroll to the bottom
* Click generate a new token (you can name it Gatsby if you want)
* See Curl under Getting Started and run the command given
* It should return: 
```
{"data":{"helloWorld":"Welcome to GraphQL! You now have a fully functional GraphQL endpoint."}}
```
* Click ‘Save’ at the top right

### Gatsby
* Install gatsby-source-graphql plugin `npm i gatsby-source-graphql --save`
* Add the source to `gatsby-config.js`
```
{
  resolve: 'gatsby-source-graphql',
  options: {
    fieldName: `craft`,
    typeName: `Craft`,
    url: `http://craft.test/api`,
    headers: {
      Authorization:
        `bearer ${process.env.CRAFTQL_API_KEY}`,
    },
  },
},
```
* Require the ‘dotenv’ package at the top of your `gatsby-config.js` (it’s already a dependency of Gatsby so you don’t need to install it)
```
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
```
* Create your own `.env.development` file under root of the project
* Add your generated CraftQL token to the file
* See the .env.example file for the format
* `gatsby develop` should start you up with a working GraphiQL connected to your Craft CMS backend
* Try a query
```
 {
  craft {
    entries {
      ...on Craft_Posts {
        title
        postContent
      }
    }
  }
}
```
* You should receive your Post data back
