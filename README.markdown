# jquery-ocupload

One-Click Upload is a jQuery plugin that replaces the standard file input element, 
allowing you to use any link, image or element to be used for the purpose of bringing
up the "file browse" dialogue. It completes the upload behind the scenes without
refreshing the page, making it less obtrusive and easier to style than a standard upload form.

## Basic Usage

As a jQuery chained function

    $(element).upload( /** options */ );

As a stand-alone jQuery function

    $.ocupload($(element), /** options */ );

## Options

Both of the functions accept an optional options object, which can contain any or all of the following:

### `name` (default: `"file"`)

The name of the file input form element.

### `enctype` (default: `"multipart/form-data"`)

The enctype attribute of the form, it is usually a good idea to leave this as default.

### `action` (default: `null`)

The form action attribute, the page that will do the processing on the server side.

### `autoSubmit` (default: `true`)

If true the form will be submitted after the user selects a file (after the file browser closes).

### `params` (default: `{}`)

Additional paramaters to be sent with the file, creates a hidden form element using the key as the name of the form and the value as the value.

### `onSubmit` (default: `null`)

The callback function called before submitting the form.

### `onComplete` (default: `null`)

The callback function called after the action page loads.

### `onSelect` (default: `null`)

The callback function called after the user has selected a file.
  
## Example

    var myUpload = $(element).upload({
            name: 'file',
            action: '',
            enctype: 'multipart/form-data',
            params: {},
            autoSubmit: true,
            onSubmit: function() {},
            onComplete: function() {},
            onSelect: function() {}
    });

## Functions
### filename
#### Description

_string_ **filename** ( void )

This function returns the name of the currently selected file.

#### Example

    var myUpload = $(element).upload();
    alert(myUpload.filename());


### name
#### Description

_string_ **name** ( void )

_void_ **name** ( string )

This function is used to get and set the name of the file input.

#### Example

    // Setting name at creation
    var myUpload = $(element).upload({
    	name: 'myFile'
    });

    // Changes the file input name to "myNewFile"
    myUpload.name('myNewFile');

    // Alerts "myNewFile"
    alert(myUpload.name());

### action
#### Description

_string_ **action** ( void )

_void_ **action** ( string )

This function is used to get and set the action of the form.

#### Example

    // Setting action at creation
    var myUpload = $(element).upload({
    	action: 'upload.php'
    });

    // Changes the form action to "path/to/dir/newUpload.php"
    myUpload.action('path/to/dir/newUpload.php');

    // Alerts "path/to/dir/newUpload.php"
    alert(myUpload.action());

### enctype 
#### Description

_string_ **enctype** ( void )

_void_ **enctype** ( string )

This function is used to get and set the enctype of the form.

#### Example

    // Setting enctype at creation
    var myUpload = $(element).upload({
    	enctype: 'multipart/form-data'
    });

    // Changes the form enctype to "application/x-www-form-urlencoded"
    myUpload.enctype('application/x-www-form-urlencoded');

    // Alerts "text/plain"
    alert(myUpload.enctype());

### params
#### Description

_object_ **params** ( void )

_void_ **params** ( object )

This function is used to alter additional parameters. 

#### Example

    // Setting paramters at creation
    var myUpload = $(element).upload({
    	params: {name: 'My file', description: 'My file description'}  
    });

    /**
     * Settings paramaters during runtime
     * 	name: "My file" is replaced with "My new file
     * 	description: remains the same
     * 	size: is added
     */
    myUpload.params({
    	name: 'My new file', size: '1000kb'
    });


### set
#### Description

_void_ **set** ( object )

This function is used to alter options after creation of the object.

#### Example

    // Setting options at creation
    var myUpload = $(element).upload( /** options */ );

    //Setting options after creation
    myUpload.set({
    	name: 'file',
    	action: '',
    	enctype: 'multipart/form-data',
    	params: {},
    	autoSubmit: true,
    	onSubmit: function() {},
    	onComplete: function() {},
    	onSelect: function() {}
    });

### submit
#### Description

_void_ **submit** ( object )

This function is used to submit the form if `autoSubmit` is turned off.

#### Example

Javascript

    var myUpload = $(element).upload( /** options */ );

HTML

    <input type="button" value="submit" onclick="myUpload.submit()" />


## Callbacks

### onSubmit

_void_ **onSubmit** ( void )

#### Description ####

This is called before the form is submitted, this is where you should make last minute changes to the parameters etc...

### onComplete

_void_ **onComplete** ( response )

#### Description

This is called after the action page has loaded, the first parameter contains the html response from the action so you can use it like an AJAX response. _*onComplete*_ does not mean the file was uploaded successfully, you should use the action script to supply a suitable response.

### onSelect

_void_ **onSelect** ( void )

#### Description

This is called after the file browse window is closed or the value of the file input is changed.