export function getLinkPath(params : Record<string,any>){
    const sortedParams = Object.keys(params).sort();
        const sortedObj = {};
        sortedParams.forEach(key => {
            sortedObj[key] = params[key];
            if (key === "brand") {
                sortedObj[key].sort()
            }
        });

        let linkPath = "";
        for (const value in sortedObj) {
            if (sortedObj[value]?.length > 0) {
                linkPath = linkPath + value + "=" + (value == "brand" ? JSON.stringify(sortedObj[value]) : sortedObj[value]) + "&";
            }
        }
        
        linkPath = linkPath.slice(0, -1);
        return linkPath
}