class Vampire {
  constructor(name, yearConverted) {
    this._name = name;
    this._yearConverted = yearConverted;
    this._offspring = [];
    this._creator = null;
  }

  // GETTERS
  get name() {
    return this._name;
  }
  get yearConverted() {
    return this._yearConverted;
  }
  get offspring() {
    return this._offspring;
  }
  get creator() {
    return this._creator;
  }
  
  // SETTERS
  set name(name) {
    this._name = name;
  }
  set yearConverted(year) {
    this._yearConverted = year;
  }
  set creator(creator) {
    this._creator = creator;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVamp = this;
    let numberOfVamp = 0;

    while(currentVamp.creator) {
      numberOfVamp += 1;
      currentVamp = currentVamp.creator;
    }

    return numberOfVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let foundAncester = null;
    let currentAncester = this;

    // Root vampire case
    if (vampire.creator === null) {
      return  vampire;
    }
    if (this.creator === null) {
      return this;
    }

    do {
      let otherAncester = vampire;

      do {
        console.log('current:', currentAncester.name, 'other:', otherAncester.name);
        if (currentAncester === otherAncester) {
          foundAncester = currentAncester;
          break;
        }

        otherAncester = otherAncester.creator
      } while (otherAncester !== null);

      if (foundAncester) {
        break;
      }
      currentAncester = currentAncester.creator;
    } while (currentAncester.creator !== null);

    console.log(foundAncester.name)
    return foundAncester;
 }
}

module.exports = Vampire;

