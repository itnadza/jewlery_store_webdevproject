$(document).ready(function() {
    
    function loadComments() {
        $.ajax({
            url: 'comments.json',  
            type: 'GET',  
            dataType: 'json',  
            success: function(data) {
                
                let commentsHtml = ''; 

               
                data.forEach(function(comment) {
                    commentsHtml += `
                        <div class="comment">
                            <p class="username">${comment.username}</p>
                            <p class="date">${comment.date}</p>
                            <p>${comment.comment}</p>
                        </div>
                    `;
                });

               
                $('#comments-container').html(commentsHtml);
            },
            error: function(xhr, status, error) {
               
                console.error("Error loading comments: ", error);
            }
        });
    }

    loadComments();
});
