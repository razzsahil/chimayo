import java.util.*;
abstract class Human{ //abstract class ka object nhi bna sakte par constructor ban sakta hai
    Human(){
        System.out.println("Human class Constructor");
    }
    abstract void eat();
}
class Indian extends Human{
    void eat(){
        System.out.println("Padh lo bhai! nhi to fail ho jaoge");
    }
}
public class Myclass{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Indian a = new Indian();
        a.eat();
    }
}