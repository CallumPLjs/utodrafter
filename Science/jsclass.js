class Scientist {
    constructor() {
        this.rank = 'recruit';
        this.bookProd = 70;
        this.experience = 0;
    }

    setRank(experience) {
        this.experience = experience;
        if (this.experience>=12000) {
            this.rank = 'professor';
        } else if (this.experience>=5520) {
            this.rank = 'graduate';
        } else if (this.experience>=1680) {
            this.rank = 'novice';
        }
        return this.rank;
    }


    setProd(rank) {
        if (this.rank == 'novice') {
            this.bookProd = 80;
        } else if (this.rank == 'graduate') {
            this.bookProd = 90;
        } else if (this.rank == 'professor') {
            this.bookProd = 100;
        }
        return this.bookProd;
    }

    setExp(bb) {
        this.experience += (this.bookProd*bb);
        return this.experience;
    }

}