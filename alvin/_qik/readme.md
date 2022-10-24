# Procedure

> `gen.qik` is always overwritten with `gen-reset.qik` so that the inputs are empty for convenience. This is done after each generation so __keep this in mind when editing__.

### Generate the problem
- Run `C:\Code\you\ComputerScienceWithJavaScript\gen-alvin.ps1` from a powershell terminal.
- This will generate the HTML files and ready the new content folder for you to paste the HTML into.

Can use nimbletext to help you with qik and save even more time
```
37,depth first values
38,breadth first values

@Number => "0$0";
@Title => "$1";
@FolderName => @Number + "-" + replace(lowerCase(removePunctuation(@Title)), " ", "-");
```

### Retrieve the content
- Navigate into Alvin Course
- Open developer tools and on the Elements run the following search phrase `"[object Object]"`

### Do this for both JavaScript and Python
- Open Problem Tab
- Right click on selected tag -> click Copy -> click Copy Outer HTML.
- Paste into relevant generated file
- Open Solution Tab
- Right click on selected tag -> click Copy -> click Copy Outer HTML.
- Paste into relevant generated file

### Testing results
- Open up the html files and right click to `Open with Live Server`.

### Best Results
- Use NimbleText to create all qik scripts.
- Run scripts one by one, effectively creating all folders.
- Run through the course first getting all JavaScript content, then getting all Python content.
