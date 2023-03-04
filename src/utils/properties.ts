//Weight:  http://pepcalc.com/ Hydropathy: http://biotools.nubic.northwestern.edu/proteincalc.html
const aminoAcidTable = {
    "A":{
      "weight": 71.07793,
      "hydropathy": 6.3},
    "C":{
      "weight": 103.1454,
      "hydropathy": 7.0},
    "D":{
      "weight": 115.0873,
      "hydropathy": 1.0},
    "E":{
      "weight": 129.1139,
      "hydropathy": 1.0},
    "F":{
      "weight": 147.1734,
      "hydropathy": 7.2},
    "G":{
      "weight": 57.05138,
      "hydropathy": 4.1},
    "H":{
      "weight": 137.1394,
      "hydropathy": 1.3},
    "I":{
      "weight": 113.1576,
      "hydropathy": 9.0},
    "K":{
      "weight": 128.1724,
      "hydropathy": 0.6},
    "L":{
      "weight": 113.1576,
      "hydropathy": 8.2},
    "M":{
      "weight": 131.1985,
      "hydropathy": 6.4},
    "N":{
      "weight": 114.1028,
      "hydropathy": 1.0},
    "P":{
      "weight": 97.11508,
      "hydropathy": 2.9},
    "Q":{
      "weight": 128.1293,
      "hydropathy": 1.0},
    "R":{
      "weight": 156.1861,
      "hydropathy": 0.0},
    "S":{
      "weight": 87.07733,
      "hydropathy": 3.6},
    "T":{
      "weight": 101.1039,
      "hydropathy": 3.8},
    "V":{
      "weight": 99.13103,
      "hydropathy": 8.7},
    "W":{
      "weight": 186.2095,
      "hydropathy": 3.6},
    "Y":{
      "weight": 163.1728,
      "hydropathy": 3.2},
    "B":{
      "weight": 133.1,
      "hydropathy": 1.0},
    "Z":{
      "weight": 147.13,
      "hydropathy": 1.0}
  }
  

let countLetter = (str:string, letter:string) => str.split(letter).length - 1;
  
  
function getPeptideProperties(peptide:string) {
    //Sum of weights of amino acids in peptide chain
      //18.01535 is weight of H and OH, the default start and end of the peptide chain
      let peptideMass = 18.01535;
  
    for (let key in aminoAcidTable)
    {
      peptideMass += countLetter(peptide, key) * aminoAcidTable[key]["weight"];
    }
    
  
    //Add your future properties to this object:
    let peptideProperties = {
      "peptideMass" : peptideMass
    }
    return peptideProperties;
}

export default getPeptideProperties