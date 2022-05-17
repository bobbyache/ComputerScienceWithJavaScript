# Qik

Syntax Guide is [here](https://github.com/bobbyache/Qik/wiki/Syntax-Guide)

## Project File

### Nimble Text (Add fragment and document to project file)

You just need to provide a name for the file to get something like `server.api.[entity].qikt`.

Provide the following input:
```
trapping-rainwater,spec.js
```
And use NimbleText to add to the project file.


```
        {
            "id": "$0",
            "path": "templates\\$0.qikt"
        },
```

```
        {
            "outputFilePaths": ["generated\\$0.$1"],
            "structure": ["$0"]
        },
```
