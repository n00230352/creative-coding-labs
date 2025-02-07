//step1
// class Friend{
//     constructor(){
//         this.name = "Giorgia"
//         this.age = 19
//     }
// }

class Friend{
    constructor(_name, _age){
        this.name = _name;
        this.age = _age;
    }

    report(){
        console.log(this.name, this.age)
    }
}
