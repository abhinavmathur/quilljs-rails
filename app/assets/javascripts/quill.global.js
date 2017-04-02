/**
 * Created by Abhinav Mathur on 16/02/17.
 * Updated on 02/04/17
 */

(function(){

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

    window.Quilljs = {
        //This method loads the default values from the global object
        setDefaults: function(new_defaults) {
            defaults = $.extend(defaults, new_defaults);
            this.addQuillContainer(defaults)
        },
        //This method loads if no global object is defined
        loadDefaults: function () {
            this.addQuillContainer(defaults)
        },
        //This method adds the quill containers
        addQuillContainer: function (settings) {

            var create_quill_containers = function(index, input_field) {
                    var current_quill_container = create_quill_container(input_field, input_field.id + '-quill');
                    var placeholder_attr = $(input_field).attr('placeholder');
                    if (typeof placeholder_attr !== typeof undefined && placeholder_attr !== false) {
                        settings.placeholder = $(input_field).attr('placeholder');
                    }

                    window['quill-container-' + index] = new Quill(current_quill_container, settings);

                    // This function adds bootstrap maxlength functionality to the quill container
                    if ($(input_field).attr('maxlength') || $(input_field).attr('minlength')) {
                        add_bootstrap_maxlength(input_field, current_quill_container);
                    }

                    // Event listener to make sure we copy the new content of the Quill back into the field
                    window['quill-container-' + index].on('editor-change', function () {
                        debounce_html(input_field, current_quill_container);
                    });

                },
                //This function creates a separate quill container since html cannot be rendered
                //properly inside input fields
                create_quill_container = function(field, quill) {
                    $(field).hide().after('<div class="form-control ' + quill + '"></div>');
                    quill = '.' + quill;
                    $(quill).html($(field).val());

                    //pass on the class name to quill container initializer
                    return quill;
                },
                // This adds maxLength compatibility for the editor
                add_bootstrap_maxlength = function (field, quill) {
                    var quill_editor = quill + ' .ql-editor';

                    //Check if fields have minlength and maxlength properties, if yes, add them to the new quill container
                    if ($(field).attr('maxlength')) {
                        $(quill_editor).attr('maxlength', $(field).attr('maxlength'));
                    }
                    if ($(field).attr('minlength')) {
                        $(quill_editor).attr('minlength', $(field).attr('minlength'));
                    }

                    //removes the minlength and maxlength properties from the original container
                    $(field).removeAttr('maxlength').removeAttr('minlength');
                },
                // Synchronises changes made into their respective hidden fields.
                debounce_html = debounce(function (input_field, current_quill_container) {
                    $(input_field).val($(current_quill_container + ' .ql-editor').html());
                }, 500);


            var quill_container = $('.quill_container');
            if (quill_container.length > 0) {
                quill_container.each(function (index, object) {
                    return create_quill_containers(index, object)
                });
            }
        }
    };

    $( document ).on('ready page:change turbolinks:load', function() {
        if ($('.ql-editor').length <= 0){
            Quilljs.loadDefaults();
        }
    });

//Debounce function exported from underscore.js to sync the quill container with the hidden input field
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
})(jQuery);