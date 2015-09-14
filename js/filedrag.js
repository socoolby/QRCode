/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }


    // output information
    function Output(msg) {
        var m = $id("messages");
        m.innerHTML = msg + m.innerHTML;
    }


    // file drag hover
    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }


    // file selection
    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            ParseFile(f);
        }

    }


    // output file information
    function ParseFile(e) {


        var canvas = $('#decode-canvas')[0],
                    ctx = canvas.getContext('2d'),
                    file =e,
                    reader = new FileReader();

                reader.onload = ( function (e){
                    var img = new Image();

                    img.onload = function (){
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                    };

                    img.src = e.target.result;
                });

                file && reader.readAsDataURL(file);


                setTimeout(function() {
                    var decodeText = $('#decode-text'),
                    text = decodeText.find('textarea'),
                    result = $('#decode-canvas').QRDecode(function (e){
                        decodeText.hide();
                        //text.val('');
                        alert(e.message);
                        throw e;
                    });
                    setTimeout(function(){
                        $("#inputTest").zclip({
                            path: "qrcode/ZeroClipboard.swf",
                            copy: function(){
                var decodeText = $('#decodeTextarea').val();
                                return decodeText;
                                //                return $(this).prev().val();
                            },
                        afterCopy:function(){
                            show_copytip();
                        }
                        });
                    },300)


                if (result) {
                    decodeText.show();
                    text.val(result);
                }
            }, 100);

    }


    // initialize
    function Init() {

        var fileselect = $id("fileselect"),
            filedrag = $id("filedrag"),
            submitbutton = $id("submitbutton");

        // file select
        fileselect.addEventListener("change", FileSelectHandler, false);

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {

            // file drop
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";

            // remove submit button
            submitbutton.style.display = "none";
        }

    }

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }


})();