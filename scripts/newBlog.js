document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "#blogContent",
    plugins:
      "autolink lists link image charmap print preview hr anchor pagebreak",
    height: 300,
    branding: false,
  });

  document
    .getElementById("blogForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // You can handle the form submission here
      // For example, collect form data and send it to a server for processing
      const title = document.getElementById("blogTitle").value;
      const content = tinymce.get("blogContent").getContent();

      // Example: Log the data to the console
      console.log("Title:", title);
      console.log("Content:", content);
    });
});
