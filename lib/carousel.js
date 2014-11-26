$(document).ready(function(){


        var deg=18;

        /* Storing all the images into a variable */

        var images  = $('#stage img').removeClass('default').addClass('animationReady');
        var dim   = { width:images.width(),height:images.height()};

        var cnt = images.length;

        /* Finding the centers of the animation container: */
        var centerX = $('#stage').width()/2;
        var centerY = $('#stage').height()/2 - dim.height/2;

        function rotate(step,total){
          // This function will loop through all the choice images, and rotate them
          // with "step" degrees (10 in this implementation) till total > 0

          /* Increment the degrees: */
          deg+=step;

          var eSin,eCos,newWidth,newHeight,q;

          /* Loop through all the images: */
          for(var i=0;i<cnt;i++){

            /* Calculate the sine and cosine for the i-th image */

            q = ((360/cnt)*i+deg)*Math.PI/180;
            eSin    = Math.sin(q);
            eCos    = Math.cos(q);

            /*
            / With the sine value, we can calculate the vertical movement,
            / and the cosine will give us the horizontal movement.
            */

            q = (0.6+eSin*0.4);
            newWidth  = q*dim.width;
            newHeight = q*dim.height;

            /*
            / We are using the calculated sine value (which is in the range
            / of -1 to 1) to calculate the opacity and z-index. The
            / frontmost image has a sine value of 1, while the backmost
            / one has a sine value of -1.
            */

            // eq() extracts the image at the i-th position:

            images.eq(i).css({
              top     : centerY+15*eSin,
              left    : centerX+200*eCos,
              opacity   : 0.8+eSin*0.2,
              marginLeft  : -newWidth/2,
              zIndex    : Math.round(80+eSin*20)
            }).width(newWidth).height(newHeight);
          }

          total-=Math.abs(step);
          if(total<=0) return false;

          // Setting the function to be run again in 40 milliseconds (equals to 25 frames per second):
          setTimeout(function(){rotate(step,total)},40);

        }

        // Running the animation once at load time (and moving the ichoice into view):
        rotate(7.2,360/cnt);

        $('#choiceCarousel .previous').click(function(){
          // 366/cnt lets us distribute the choices evenly in a circle
          rotate(-7.2,360/cnt);
        });

        $('#choiceCarousel .next').click(function(){
          rotate(7.2,360/cnt);
        });



      });
