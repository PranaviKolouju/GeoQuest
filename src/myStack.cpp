#include <iostream>
using namespace std;


template <typename T, int max_size>
class myStack{
private:
    T arr[max_size];
    int length = 0;
public:
    myStack(){};
    void push(T ele);
    void pop();
    T top();
    void size();
    void display();
    bool empty();
};

template <typename T, int max_size>
bool myStack<T,max_size>::empty(){
    if (length == 0){
        return true;
    }
    else{
        return false;
    }
}

template <typename T, int max_size>
void myStack<T,max_size>::push(T ele){
    if (length < max_size){
        arr[length] = ele;
        length += 1;
    }
    else{
        cout << "Error: Stack Overflow" << endl;
    }
}
template <typename T, int max_size>
void myStack<T,max_size>::pop(){
    if (empty()){
        cout << "Error: Stack Underflow" << endl;
    }
    else{
        length -= 1;
    }
}

template <typename T, int max_size>
T myStack<T,max_size>::top(){
    return arr[length-1];
}

template <typename T, int max_size>
void myStack<T,max_size>::size(){
    cout << length << endl;
}

template <typename T, int max_size>
void myStack<T,max_size>::display(){
    if (empty()){
        cout << "There are no elements to display!" << endl;
    }
    else{
        for (int i = (length - 1); i >= 0; i--){
            cout << arr[i] << " ";
        }
        cout << endl;
    }
}