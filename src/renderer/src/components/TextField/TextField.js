export function searchEngineProcess(query = "", queryNetwork = [], maxResults = 10, ddCallback = (dd) => {}, writeToSearchDelayObj, writeTime = 100) {
    if (query.length > 0) {
        ddCallback([]);
        const words = query.split(" ");
        let result = [];

        clearTimeout(writeToSearchDelayObj.x);
        
        for (let possibleResult = 0; possibleResult < maxResults; possibleResult++) {
            words.forEach((word) => {
            queryNetwork.forEach((item) => {
                if (item.label.includes(word)) {
                if (result.find((r) => r.label === item.label)) return;
                result.push(item);
                }

                if ((item.value ? item.value : "").includes(word)) {
                if (result.find((r) => r.label === item.label)) return;
                result.push(item);
                }

                item.keywords.forEach((keyword) => {
                const wordsKeyWord = keyword.split(" ");
                
                if (result.find((r) => r.label === item.label)) return;

                for (let i = 0; i < wordsKeyWord.length; i++) {
                    const currentWord = wordsKeyWord[i];
                    const nextWord = wordsKeyWord[i + 1];

                    if (currentWord === word) {
                    if (nextWord) {
                        if (words[i + 1] === nextWord) {
                        result.push(item);
                        break;
                        }
                    } else {
                        result.push(item);
                        break;
                    }
                    }
                }
                });
            });
            });
        }

        writeToSearchDelayObj.x = setTimeout(() => {
            if (result[0]) {
                result[0].bestMatch = true;
            }

            ddCallback(result);
        }, writeTime);
    } else {
        ddCallback([]);
    }   
}