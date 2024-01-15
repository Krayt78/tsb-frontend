    const componentArray = ["component1", "component2", "component3"];
    const titleArray = ["title1", "title2", "title3"];

    console.log("testDUplicateComponent.ts");
    var component = document.getElementById("proposal");
    var proposalList = document.getElementById("proposals-list");
    //let menu = document.querySelector('#menu');

    for(let i = 0; i < componentArray.length; i++){
        var duplicatedComponent = component.cloneNode(true);
        if(duplicatedComponent){
            duplicatedComponent.id = "duplicated"+componentArray[i];
            const title = document.getElementById("proposal-titre");
            title.id = "duplicated"+titleArray[i];
            title.innerText = titleArray[i];
            proposalList.appendChild(duplicatedComponent);
            console.log(duplicatedComponent);
        }
    }