# Quilljs::Rails

[![Gem Version](https://badge.fury.io/rb/quilljs-rails.svg)](https://badge.fury.io/rb/quilljs-rails)
[![Gem](https://img.shields.io/gem/dt/quilljs-rails.svg)](https://rubygems.org/gems/quilljs-rails)

This gem adds a Quill rich editor to an existing text field or text area.
[Quill - Your powerful, rich text editor](http://quilljs.com/)
## Installation

Add this line to your application's Gemfile:

```ruby
gem 'quilljs-rails'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install quilljs-rails


## Usage

### From CDN(recommended)
Add these lines in the head section of application.html.erb

    <script src="https://cdn.quilljs.com/1.1.9/quill.js"></script>
    <link href="https://cdn.quilljs.com/1.1.9/quill.snow.css" rel="stylesheet">
Then add this line to your application.js file

```ruby
  //= require quill.global
```

Add the class `quill_container` to the desired text_field or text_area

Eg. with `bootstrap_form_for`,

    <%= f.text_field :title, label: 'Title', type: 'text', class: 'quill_container' %>

With `Simple form`,

    <%= f.input :title, input_html: { class: 'quill_container' } %>

Quilljs loads with these defaults :-

```javascript

        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                ['clean']
            ]
        }
    
```

In order to customize your defaults, this gem comes with a global javascript object. You can 
setup the global object(in a js file) like this :-

```javascript
var defaults = {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                ['clean']
            ]
        }
    };

//This is the global config object
Quilljs.setDefaults(defaults)
```
    
### From the gem
Add these lines to application.js

    //= require quill.min
    //= require quill.global
    
Add these lines to application.scss(or application.css if you are not using sass)
    
    *= require quill.snow
    
This gem comes with the core, snow(default) and bubble themes. For eg. to use the bubble theme
remove other quill themes and add

    *= require quill.bubble
    
Make sure to add `theme: 'bubble'` in the `Quilljs.setDefaults` setting as explained above.

This gem also comes with the latest `quill.min.js` and `quill.core.js`.

This gem can also be used in conjuction with [bootstrap maxlength](https://mimo84.github.io/bootstrap-maxlength/).
## Development


To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/abhinavmathur/quilljs-rails.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

