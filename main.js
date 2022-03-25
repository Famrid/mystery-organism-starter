const relatedInstance = [];

// Returns a random DNA base
function returnRandBase() {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const changeDnaBase = (base) => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  const finalBases = dnaBases.filter(element => element !== base);
  const changedBase = finalBases[Math.floor(Math.random() * 3)];
  return changedBase
}

const pAequorFactory = (uniqueNumber) => {
  return {
    specimenNum: uniqueNumber,
    get specimenNum_() { return this.specimenNum },
    dna: mockUpStrand(),
    get dna_() { return this.dna; },
    mutate() {
      const indexToChange = Math.floor(Math.random() * 15);
      const dnaBasesToChange = this.dna[indexToChange];
      const newDnaBase = changeDnaBase(dnaBasesToChange);
      this.dna.splice(indexToChange, 1, newDnaBase);
    },
    compareDNA(array) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        this.dna[i] == array.dna[i] ? count++ : false;
        console.log([array.dna[i], this.dna[i]]);
      };
      relatedInstance.push([this.specimenNum, array.specimenNum, ((count / 15) * 100)]);
      console.log(`The percentage of dna shared between specimen #${this.specimenNum} and #${array.specimenNum} is ${((count / 15) * 100)} %`);
    },
    willLikelySurvive() {
      let CAndGCount = this.dna.filter(base => (base == 'C') || (base == 'G')).length;
      let percentageSurvivability = (CAndGCount / 15) * 100;
      if (percentageSurvivability > 59) {
        console.log(`Specimen ${this.specimenNum} will survive`);
        return true;
      } else {
        console.log(`Specimen ${this.specimenNum} won't survive`);
        return false;
      }
    },
    complementStrand() {
      const complementArray = mockUpStrand();
      const complementArray2 = complementArray.map(element => {
        switch (element) {
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'C':
            return 'G';
            break;
          case 'G':
            return 'C';
            break;
          default:
            console.log('error');
            break;
        }
      });
      console.log([complementArray, complementArray2]);
    }
  };
};

const arrayPaequor = [];

for (let i = 0; i < 30; i++) {
  arrayPaequor.push(pAequorFactory(i));
  arrayPaequor[i].willLikelySurvive();
}











