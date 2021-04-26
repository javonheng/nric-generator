const expect = require('chai').expect;
const request = require('request');

function checkEmptyYear(year) {
    if (!year) return true;
        else return false;
}

function checkValidYear(year) {
    if (year < 1800 || year > 2100) {
        return false;
    } else {
        return true;
    }
}

function checkFirstPrefixBasedOnYear(year) {
    prefixes = [];
    if (parseInt(year) >= 2000 && parseInt(year) <= 2100) {
        prefixes = ['T', 'G'];
    } else if (parseInt(year) >= 1800 && parseInt(year) < 2000) {
        prefixes = ['S', 'F'];
    }
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

function checkFirst2DigitsFromRandomGeneratedNumber(year) {
    const digit1 = year.charAt(2);
    const digit2 = year.charAt(3);

    const random7digit = Math.floor(1000000 + Math.random() * 9000000).toString();

    const number = digit1 + digit2 + random7digit.slice(2);
    return number.substring(0, 2);
}

function checkLastPrefix(firstPrefix, year) {
    const multiplyFactors = [2, 7, 6, 5, 4, 3, 2];
    const digit1 = year.charAt(2);
    const digit2 = year.charAt(3);

    const random7digit = Math.floor(1000000 + Math.random() * 9000000).toString();
    sum = 0;
    const number = digit1 + digit2 + random7digit.slice(2);
    if (firstPrefix === 'G' || firstPrefix === 'T') {
        sum = 4 + number.split('').map(s => parseInt(s)).map((digit, i) => digit * multiplyFactors[i]).reduce((a, b) => a + b, 0);
    } else {
        sum = number.split('').map(s => parseInt(s)).map((digit, i) => digit * multiplyFactors[i]).reduce((a, b) => a + b, 0);
    }

    const lastAplhabet_ST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const lastAplhabet_FG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
    lastAlphabet = '';

    switch(firstPrefix) {
        case 'S':
        case 'T':
            lastAlphabet = lastAplhabet_ST[sum % 11];
            return lastAlphabet;
        case 'F':
        case 'G':
            lastAlphabet = lastAplhabet_FG[sum % 11];
            return lastAlphabet;
    }

}

function getRandomNRIC (year) {

    prefixes = [];
    if (parseInt(year) >= 2000 && parseInt(year) <= 2100) {
        prefixes = ['T', 'G'];
    } else if (parseInt(year) >= 1800 && parseInt(year) < 2000) {
        prefixes = ['S', 'F'];
    }

    const digit1 = year.charAt(2);
    const digit2 = year.charAt(3);
    const lastAplhabet_ST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const lastAplhabet_FG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

    lastAlphabet = '';
    nric = '';

    const selectedPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const random7digit = Math.floor(1000000 + Math.random() * 9000000).toString();

    const number = digit1 + digit2 + random7digit.slice(2);
    function stringtoSum (number) {
        const multiplyFactors = [2, 7, 6, 5, 4, 3, 2];
        return number.split('').map(s => parseInt(s)).map((digit, i) => digit * multiplyFactors[i]).reduce((a, b) => a + b, 0);
    }

    let sum = 0;
    if (selectedPrefix === 'T' || selectedPrefix === 'G') sum = 4;
    sum += stringtoSum(number);

    function getLastPrefix(firstPrefix) {
        switch(firstPrefix) {
            case 'S':
            case 'T':
                lastAlphabet = lastAplhabet_ST[sum % 11];
                return lastAlphabet;
            case 'F':
            case 'G':
                lastAlphabet = lastAplhabet_FG[sum % 11];
                return lastAlphabet;
        }
    }
    getLastPrefix(selectedPrefix);
    return selectedPrefix + number + lastAlphabet;
}


// Test 1 - Input Year >= 2000
var year = "2015";

describe('Check Input 1 - Input Year >= 2000', () => {
    it('Should be 4 Digits', () => {
        expect(year).to.have.lengthOf(4);
    });
    it('Should be A String', () => {
        expect(year).to.be.a('string');
    });
    it("Check If Input Is Empty", () => {
        expect(checkEmptyYear(year)).to.be.false;
    });
    it("Check If The Year Is Valid", () => {
        expect(checkValidYear(year)).to.be.true;
    });
    it("Check First Prefix Based On Input Year", () => {
        expect(["T", "G"]).to.include(checkFirstPrefixBasedOnYear(year));
    });
    it("Check First 2 Digits Of Generated NRIC", () => {
        expect(checkFirst2DigitsFromRandomGeneratedNumber(year)).to.equal("15");
    });
    it("Check Last Prefix Based On Year (Local)", () => {
        const lastAplhabet_ST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        expect(lastAplhabet_ST).to.include(checkLastPrefix("T", year));
    });
    it("Check Last Prefix Based On Year (Foreigner)", () => {
        const lastAplhabet_FG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
        expect(lastAplhabet_FG).to.include(checkLastPrefix("G", year));
    });
    it("Check Generated NRIC start with either of the following alphabets: S,T,F,G", () => {
        expect(['S', 'T', 'F', 'G']).to.include(getRandomNRIC(year).charAt(0).toUpperCase());
    });
    it("Check Generated NRIC has 7 digits after First Prefix", () => {
        const digits = getRandomNRIC(year).substring(1, 8);
        const number = parseInt(digits);
        expect(digits).to.have.lengthOf(7);
        expect(number).to.be.a('number');
    });

});

// Test 2 - Input Year < 2000
var year2 = "1995";

describe('Check Input 2 - Input Year < 2000', () => {
    it('Should be 4 Digits', () => {
        expect(year2).to.have.lengthOf(4);
    });
    it('Should be A String', () => {
        expect(year2).to.be.a('string');
    });
    it("Check If Input Is Empty", () => {
        expect(checkEmptyYear(year2)).to.be.false;
    });
    it("Check If The Year Is Valid", () => {
        expect(checkValidYear(year2)).to.be.true;
    });
    it("Check First Prefix Based On Input Year", () => {
        expect(["S", "F"]).to.include(checkFirstPrefixBasedOnYear(year2));
    });
    it("Check First 2 Digits Of Generated NRIC", () => {
        expect(checkFirst2DigitsFromRandomGeneratedNumber(year2)).to.equal("95");
    });
    it("Check Last Prefix Based On Year (Local)", () => {
        const lastAplhabet_ST = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        expect(lastAplhabet_ST).to.include(checkLastPrefix("S", year2));
    });
    it("Check Last Prefix Based On Year (Foreigner)", () => {
        const lastAplhabet_FG = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
        expect(lastAplhabet_FG).to.include(checkLastPrefix("F", year2));
    });
    it("Check Generated NRIC start with either of the following alphabets: S,T,F,G", () => {
        expect(['S', 'T', 'F', 'G']).to.include(getRandomNRIC(year2).charAt(0).toUpperCase());
    });
    it("Check Generated NRIC has 7 digits after First Prefix", () => {
        const digits = getRandomNRIC(year2).substring(1, 8);
        const number = parseInt(digits);
        expect(digits).to.have.lengthOf(7);
        expect(number).to.be.a('number');
    });

});

// Test 3 - Empty Input
var year3 = "";

describe('Check Input 3 - Empty Input', () => {
    it('Should be 4 Digits', () => {
        expect(year3.length).to.equal(0);
    });
    it('Should be A String', () => {
        expect(year3).to.be.a('string');
    });
    it("Check If Input Is Empty", () => {
        expect(checkEmptyYear(year3)).to.be.true;
    });

});

// Test 4 - Invalid Year
var year4 = "2221";

describe('Check Input 4 - Invalid Year ', () => {
    it('Should be 4 Digits', () => {
        expect(year4).to.have.lengthOf(4);
    });
    it('Should be A String', () => {
        expect(year4).to.be.a('string');
    });
    it("Check If Input Is Empty", () => {
        expect(checkEmptyYear(year4)).to.be.false;
    });
    it("Check If The Year Is Valid", () => {
        expect(checkValidYear(year4)).to.be.false;
    });

});