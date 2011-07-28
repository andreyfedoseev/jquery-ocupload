/*
One Click Upload - jQuery Plugin
--------------------------------

Copyright (c) 2008 Michael Mitchell - http://www.michaelmitchell.co.nz
Copyright (c) 2011 Andrey Fedoseev <andrey.fedoseev@gmail.com> - http://andreyfedoseev.name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function($) {
    
    $.fn.upload = function(options) {
        /** Merge the users options with our defaults */
        options = $.extend({
            name: 'file',
            enctype: 'multipart/form-data',
            action: '',
            autoSubmit: true,
            onSubmit: function() {
            },
            onComplete: function() {
            },
            onSelect: function() {
            },
            params: {}
        }, options);

        return new $.ocupload(this, options);
    },

            $.ocupload = function(element, options) {
                /** Fix scope problems */
                var self = this;

                /** A unique id so we can find our elements later */
                var id = new Date().getTime().toString().substr(8);
                var target = "iframe" + id;

                var $container = element.wrap("<div></div>").parent();

                /** File Input */
                var $input = $("<input>", {
                    name: options.name,
                    type: "file"
                }).css({
                    position: 'absolute',
                    display: 'inline-block',
                    opacity: 0
                });

                /** Form */
                var original_attrs = {};
                var original_submit_handlers = [];
                var $form = element.closest("form");
                if ($form.length) {
                    original_attrs = {
                        action: $form.attr("action"),
                        target: $form.attr("target"),
                        method: $form.attr("method"),
                        enctype: $form.attr("enctype")
                    };
                    original_submit_handlers = $form.data("events")["submit"];
                    if (original_submit_handlers !== undefined && original_submit_handlers !== null) {
                        original_submit_handlers = original_submit_handlers.slice();
                    }
                    $input.insertAfter(element);
                } else {
                    $form = $("<form>").css({
                        margin: 0,
                        padding: 0
                    });
                    $input.appendTo($form);
                    $form.insertAfter(element);
                }

                $form.data({
                    "upload-action": options.action,
                    "upload-target": target,
                    "upload-method": "post",
                    "upload-enctype": options.enctype
                });

                /** Upload Iframe */
                var $iframe = $("<iframe>", {
                    id: target,
                    name: target
                }).css({
                    display: "none"
                }).appendTo($container);


                /** Find the container and make it nice and snug */
                $container.css({
                    position: 'relative',
                    height: element.outerHeight() + 'px',
                    width: element.outerWidth() + 'px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    margin: 0,
                    padding: 0
                });

                /** Put our file input in the right place */
                $input.css({
                    top: 0,
                    left: 0,
                    width: $container.innerWidth() + "px",
                    height: $container.innerHeight() + "px"
                });

                /** Watch for file selection */
                $input.change(function() {
                    /** Do something when a file is selected. */
                    self.onSelect();

                    /** Submit the form automaticly after selecting the file */
                    if (self.autoSubmit) {
                        self.submit();
                    }
                });

                /** Methods */
                $.extend(this, {
                    autoSubmit: true,
                    onSubmit: options.onSubmit,
                    onComplete: options.onComplete,
                    onSelect: options.onSelect,

                    /** get filename */
                    filename: function() {
                        return $input.attr('value');
                    },

                    /** get/set params */
                    params: function(params) {
                        params = params ? params : false;

                        if (params) {
                            options.params = $.extend(options.params, params);
                        }
                        else {
                            return options.params;
                        }
                    },

                    /** get/set name */
                    name: function(name) {
                        name = name ? name : false;

                        if (name) {
                            $input.attr('name', value);
                        }
                        else {
                            return $input.attr('name');
                        }
                    },

                    /** get/set action */
                    action: function(action) {
                        action = action ? action : false;

                        if (action) {
                            $form.data("upload-action", action);
                        }
                        else {
                            return $form.data("upload-action")
                        }
                    },

                    /** get/set enctype */
                    enctype: function(enctype) {
                        enctype = enctype ? enctype : false;

                        if (enctype) {
                            $form.attr("upload-enctype", enctype);
                        }
                        else {
                            return $form.attr("upload-enctype");
                        }
                    },

                    /** set options */
                    set: function(obj, value) {
                        value = value ? value : false;

                        function option(action, value) {
                            switch (action) {
                                default:
                                    throw new Error('[jQuery.ocupload.set] \'' + action + '\' is an invalid option.');
                                    break;
                                case 'name':
                                    self.name(value);
                                    break;
                                case 'action':
                                    self.action(value);
                                    break;
                                case 'enctype':
                                    self.enctype(value);
                                    break;
                                case 'params':
                                    self.params(value);
                                    break;
                                case 'autoSubmit':
                                    self.autoSubmit = value;
                                    break;
                                case 'onSubmit':
                                    self.onSubmit = value;
                                    break;
                                case 'onComplete':
                                    self.onComplete = value;
                                    break;
                                case 'onSelect':
                                    self.onSelect = value;
                                    break;
                            }
                        }

                        if (value) {
                            option(obj, value);
                        }
                        else {
                            $.each(obj, function(key, value) {
                                option(key, value);
                            });
                        }
                    },

                    /** Submit the form */
                    submit: function() {
                        /** Do something before we upload */
                        this.onSubmit();

                        var additional_inputs = [];

                        /** add additional parameters before sending */
                        $.each(options.params, function(key, value) {
                            additional_inputs.push(
                                $form.append($("<input>", {
                                    type: "hidden",
                                    name: key,
                                    value: value
                                }))
                            );
                        });

                        // Update form attributes
                        $form.attr("action", $form.data("upload-action"));
                        $form.attr("target", $form.data("upload-target"));
                        $form.attr("method", $form.data("upload-method"));
                        $form.attr("enctype", $form.data("upload-enctype"));

                        // Unbind existing submit handlers
                        if (original_submit_handlers !== undefined && original_submit_handlers !== null) {
                            $.each(original_submit_handlers, function(i, handler){
                                $form.unbind("submit", handler.handler);
                            });
                        }

                        /** Submit the actual form */
                        $form.submit();

                        // Revert the form back to original attributes
                        for (var attr in original_attrs) {
                            var value = original_attrs[attr];
                            if (value !== undefined && value !== null) {
                                $form.attr(attr, value);
                            } else {
                                $form.removeAttr(attr);
                            }
                        }

                        // Restore submit handlers
                        if (original_submit_handlers !== undefined && original_submit_handlers !== null) {
                            $.each(original_submit_handlers, function(i, handler){
                                $form.bind("submit", handler.data, handler.handler);
                            });
                        }

                        // Remove additional parameters inputs
                        $.each(additional_inputs, function(i, $el) {
                            $el.remove();
                        });

                        /** Do something after we are finished uploading */
                        $iframe.unbind().load(function() {
                            /** Get a response from the server in plain text */
                            var myFrame = document.getElementById($iframe.attr('name'));
                            var response = $(myFrame.contentWindow.document.body).text();

                            /** Do something on complete */
                            self.onComplete(response); //done :D
                        });
                    }
                });
            }
})(jQuery);