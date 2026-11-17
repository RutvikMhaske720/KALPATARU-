//1st
1


#include<iostream>
using namespace std;

class rotation
{
    int arr[100], n, k;

public:
    rotation()
    {
        n = 0;
        k = 0;

        for(int i = 0; i < 100; i++)
        {
            arr[i] = 0;
        }
    }

    void input()
    {
        cout<<"Enter the size of array :"<<endl;
        cin>>n;

        if(n <= 0 || n > 100)
        {
            cout<<"Invalid array size"<<endl;
            n = 0;
            return;
        }

        cout<<"Enter the elements :"<<endl;
        for(int i = 0; i < n; i++)
        {
            cin>>arr[i];
        }

        cout<<"Enter the elements for rotation :"<<endl;
        cin>>k;

        if(k < 0)
        {
            cout<<"Invalid rotation count"<<endl;
            k = 0;
        }

        k = k % n;
    }

    void display()
    {
        for(int i = 0; i < n; i++)
        {
            cout<<arr[i]<<" ";
        }
        cout<<endl;
    }

    void leftR()
    {
        if(n == 0)
            return;
        for(int i = 0; i < k; i++)
        {
            int temp = arr[0];

            for(int j = 0; j < n-1; j++)
            {
                arr[j] = arr[j+1];
            }

            arr[n-1] = temp;
        }
        display();
    }

    void rightR()
    {
        if(n == 0)
            return;
        for(int i = 0; i < k; i++)
        {
            int temp = arr[n-1];

            for(int j = n-1; j > 0; j--)
            {
                arr[j] = arr[j-1];
            }

            arr[0] = temp;
        }
        display();
    }
};

int main()
{
    rotation s;
    int choice;
    do
    {
        cout<<"\n1. Left Rotation";
        cout<<"\n2. Right Rotation";
        cout<<"\n3. Exit"<<endl;

        cout<<"Enter your choice :";
        cin>>choice;

        switch(choice)
        {
            case 1:
                s.input();
                s.leftR();
                break;

            case 2:
                s.input();
                s.rightR();
                break;

            case 3:
                break;

            default:
                cout<<"Invalid choice"<<endl;
                break;
        }

    }while(choice != 3);

    return 0;
}

    

    


// // //2nd
2





#include<iostream>
using namespace std;

class arr{
    int a[10][10],r,c;

    public :
        arr()
        {
            r=0,c=0;
        }

        void input()
        {
            cout<<"Ente the number of rows :"<<endl;
            cin>>r;

            cout<<"Enter the number of columns :"<<endl;
            cin>>c;

            for(int i=0;i<r;i++){
                for(int j=0;j<c;j++){
                    cin>>a[i][j];
                }
            }
        }

        void display()
        {
            for(int i=0;i<r;i++){
                for(int j=0;j<c;j++){
                    cout<<a[i][j]<<" ";
                }
                cout<<endl;
            }

            cout<<endl;
        }

        void addition(arr m1,arr m2){
            if(m1.r != m2.r || m1.c != m2.c){
                cout<<"Invalid array for addiion :"<<endl;
                return;
            }
            else{
                r=m1.r;
                c=m1.c;
                for(int i=0;i<r;i++){
                    for(int j=0;j<c;j++){
                        a[i][j]=m1.a[i][j]+m2.a[i][j];
                    }
                }
            }
            display();
        }

        void mul(arr m1 ,arr m2){
            if(m1.c!=m2.r){
                cout<<"Invalid for multiplication :"<<endl;
                return;
            }else{
                 r = m1.r;
                 c = m2.c;
                for(int i=0;i<r;i++){
                    for(int j=0;j<c;j++){
                        a[i][j]=0;
                        for(int k=0;k<m1.c;k++){
                            a[i][j]+=m1.a[i][k]*m2.a[k][j];
                        }
                    }
                }
                display();
            }
        }
};

int main()
{
    arr m1,m2,result;
    int choice;
    do{
        cout<<"\n1.addition\n2.multiplication.\n3.exit\n"<<endl;
        cout<<"Enter your choice :"<<endl;
        cin>>choice;
        switch(choice){
            case 1:
                cout<<"Enter the 1st array :"<<endl;
                m1.input();

                cout<<"Enter the second array :"<<endl;
                m2.input();

                result.addition(m1,m2);
                break;
            case 2:
                 cout<<"Enter the 1st array :"<<endl;
                 m1.input();

                cout<<"Enter the second array :"<<endl;
                m2.input();

                result.mul(m1,m2);
                break;
            case 3:
                break;
            default :
                cout<<"invalid choice :";
                break;
        }
    }while(choice!=3);

}





//3rd
3





#include<iostream>
using namespace std;

class node
{
public:
    int coeff, pow;
    node *next;

    node(int c, int p)
    {
        coeff = c;
        pow = p;
        next = NULL;
    }
};

class Polynomial
{
    node *head;

public:

    Polynomial()
    {
        head = NULL;
    }

    void insert(int c, int p)
    {
        node *temp = new node(c,p);

        if(head == NULL)
            head = temp;
        else
        {
            node *t = head;

            while(t->next != NULL)
                t = t->next;

            t->next = temp;
        }
    }

    void input()
    {
        int n,c,p;

        cout<<"Enter number of terms: ";
        cin>>n;

        for(int i=0; i<n; i++)
        {
            cout<<"Enter coefficient and power: ";
            cin>>c>>p;
            insert(c,p);
        }
    }

    void add(Polynomial p1, Polynomial p2)
    {
        node *a = p1.head;
        node *b = p2.head;

        while(a != NULL && b != NULL)
        {
            if(a->pow == b->pow)
            {
                insert(a->coeff + b->coeff, a->pow);
                a = a->next;
                b = b->next;
            }
            else if(a->pow > b->pow)
            {
                insert(a->coeff, a->pow);
                a = a->next;
            }
            else
            {
                insert(b->coeff, b->pow);
                b = b->next;
            }
        }

        while(a != NULL)
        {
            insert(a->coeff, a->pow);
            a = a->next;
        }

        while(b != NULL)
        {
            insert(b->coeff, b->pow);
            b = b->next;
        }
    }

    void display()
    {
        node *t = head;

        while(t != NULL)
        {
            cout<<t->coeff<<"x^"<<t->pow;

            if(t->next != NULL)
                cout<<" + ";

            t = t->next;
        }

        cout<<endl;
    }
};

int main()
{
    Polynomial p1,p2,p3;

    cout<<"Enter first polynomial:\n";
    p1.input();

    cout<<"Enter second polynomial:\n";
    p2.input();

    cout<<"\nFirst polynomial: ";
    p1.display();

    cout<<"Second polynomial: ";
    p2.display();

    p3.add(p1,p2);

    cout<<"Addition: ";
    p3.display();

    return 0;
}





//4th
4






#include<iostream>
using namespace std;

class node
{
public:
    int data;
    node *prev, *next;

    node(int x)
    {
        data = x;
        prev = next = NULL;
    }
};

class DLL
{
    node *head;

public:

    DLL()
    {
        head = NULL;
    }

    void insert(int x)
    {
        node *temp = new node(x);

        if(head == NULL)
            head = temp;
        else
        {
            node *t = head;

            while(t->next != NULL)
                t = t->next;

            t->next = temp;
            temp->prev = t;
        }
    }

    void input()
    {
        int n, x;

        cout<<"Enter number of nodes: ";
        cin>>n;

        for(int i=0; i<n; i++)
        {
            cout<<"Enter data: ";
            cin>>x;
            insert(x);
        }
    }

    void merge(DLL l1, DLL l2)
    {
        node *a = l1.head;
        node *b = l2.head;

        while(a != NULL || b != NULL)
        {
            
            
            if(a != NULL)
            {
                insert(a->data);
                a = a->next;
            }

            if(b != NULL)
            {
                insert(b->data);
                b = b->next;
            }
        }
    }

    void sort()
    {
        node *i, *j;
        int temp;

        for(i = head; i != NULL; i = i->next)
        {
            for(j = i->next; j != NULL; j = j->next)
            {
                if(i->data > j->data)
                {
                    temp = i->data;
                    i->data = j->data;
                    j->data = temp;
                }
            }
        }
    }

    void display()
    {
        node *t = head;

        while(t != NULL)
        {
            cout<<t->data<<" ";
            t = t->next;
        }

        cout<<endl;
    }
};

int main()
{
    DLL l1, l2, l3;

    cout<<"Enter first linked list:\n";
    l1.input();

    cout<<"Enter second linked list:\n";
    l2.input();

    cout<<"\nFirst linked list: ";
    l1.display();

    cout<<"Second linked list: ";
    l2.display();

    l3.merge(l1,l2);

    cout<<"\nAfter alternate merging: ";
    l3.display();

    l3.sort();

    cout<<"After sorting: ";
    l3.display();

    return 0;
}





//5th
5






#include<iostream>
using namespace std;

class node
{
public:
    int seat;
    string name;
    node *next;

    node(int s, string n)
    {
        seat = s;
        name = n;
        next = NULL;
    }
};

class Railway
{
    node *head;

public:

    Railway()
    {
        head = NULL;
    }

    void insertFirst()
    {
        int s;
        string n;

        cout<<"Enter seat number: ";
        cin>>s;

        cout<<"Enter passenger name: ";
        cin>>n;

        node *temp = new node(s,n);

        if(head == NULL)
        {
            head = temp;
            temp->next = head;
        }
        else
        {
            node *t = head;

            do
            {
                if(t->seat == s)
                {
                    cout<<"Seat already booked!\n";
                    delete temp;
                    return;
                }
                t = t->next;
            }while(t != head);

            node *last = head;

            while(last->next != head)
                last = last->next;

            temp->next = head;
            last->next = temp;
            head = temp;
        }

        cout<<"Ticket booked successfully!\n";
    }

    void insertLast()
    {
        int s;
        string n;

        cout<<"Enter seat number: ";
        cin>>s;

        cout<<"Enter passenger name: ";
        cin>>n;

        node *temp = new node(s,n);

        if(head == NULL)
        {
            head = temp;
            temp->next = head;
        }
        else
        {
            node *t = head;

            do
            {
                if(t->seat == s)
                {
                    cout<<"Seat already booked!\n";
                    delete temp;
                    return;
                }
                t = t->next;
            }while(t != head);

            while(t->next != head)
                t = t->next;

            t->next = temp;
            temp->next = head;
        }

        cout<<"Ticket booked successfully!\n";
    }

    void deleteFirst()
    {
        if(head == NULL)
        {
            cout<<"No bookings available!\n";
            return;
        }

        node *t = head;

        if(head->next == head)
            head = NULL;
        else
        {
            node *last = head;

            while(last->next != head)
                last = last->next;

            head = head->next;
            last->next = head;
        }

        delete t;
        cout<<"First ticket cancelled!\n";
    }

    void deleteLast()
    {
        if(head == NULL)
        {
            cout<<"No bookings available!\n";
            return;
        }

        node *t = head;

        if(head->next == head)
            head = NULL;
        else
        {
            node *prev = NULL;

            while(t->next != head)
            {
                prev = t;
                t = t->next;
            }

            prev->next = head;
        }

        delete t;
        cout<<"Last ticket cancelled!\n";
    }

    void deleteSeat()
    {
        if(head == NULL)
        {
            cout<<"No bookings available!\n";
            return;
        }

        int s;
        cout<<"Enter seat number: ";
        cin>>s;

        node *t = head;
        node *prev = NULL;

        do
        {
            if(t->seat == s)
            {
                if(t == head && t->next == head)
                    head = NULL;
                else if(t == head)
                {
                    node *last = head;

                    while(last->next != head)
                        last = last->next;

                    head = head->next;
                    last->next = head;
                }
                else
                    prev->next = t->next;

                delete t;
                cout<<"Ticket cancelled successfully!\n";
                return;
            }

            prev = t;
            t = t->next;

        }while(t != head);

        cout<<"Seat not found!\n";
    }

    void display()
    {
        if(head == NULL)
        {
            cout<<"No bookings available!\n";
            return;
        }

        node *t = head;

        cout<<"\nBooked Tickets:\n";

        do
        {
            cout<<"Seat: "<<t->seat
                <<" Name: "<<t->name<<endl;

            t = t->next;

        }while(t != head);
    }

    void search()
    {
        if(head == NULL)
        {
            cout<<"No bookings available!\n";
            return;
        }

        int s;
        cout<<"Enter seat number to search: ";
        cin>>s;

        node *t = head;

        do
        {
            if(t->seat == s)
            {
                cout<<"Passenger found!\n";
                cout<<"Seat: "<<t->seat<<endl;
                cout<<"Name: "<<t->name<<endl;
                return;
            }

            t = t->next;

        }while(t != head);

        cout<<"Passenger not found!\n";
    }

    void count()
    {
        if(head == NULL)
        {
            cout<<"Total booked tickets: 0\n";
            return;
        }

        int c = 0;
        node *t = head;

        do
        {
            c++;
            t = t->next;
        }while(t != head);

        cout<<"Total booked tickets: "<<c<<endl;
    }
};

int main()
{
    Railway r;
    int ch;

    do
    {
        cout<<"\n===== RAILWAY RESERVATION SYSTEM =====\n";
        cout<<"1. Insert at Beginning\n";
        cout<<"2. Insert at End\n";
        cout<<"3. Delete from Beginning\n";
        cout<<"4. Delete from End\n";
        cout<<"5. Delete Specific Seat\n";
        cout<<"6. Display Tickets\n";
        cout<<"7. Search Passenger\n";
        cout<<"8. Count Tickets\n";
        cout<<"9. Exit\n";

        cout<<"Enter your choice: ";
        cin>>ch;

        switch(ch)
        {
            case 1:
                r.insertFirst();
                break;

            case 2:
                r.insertLast();
                break;

            case 3:
                r.deleteFirst();
                break;

            case 4:
                r.deleteLast();
                break;

            case 5:
                r.deleteSeat();
                break;

            case 6:
                r.display();
                break;

            case 7:
                r.search();
                break;

            case 8:
                r.count();
                break;

            case 9:
                cout<<"Thank you!\n";
                break;

            default:
                cout<<"Invalid choice!\n";
        }

    }while(ch != 9);

    return 0;
}








// //6th
6






#include<iostream>
using namespace std;

class Stack
{
    int a[8], top;

public:

    Stack()
    {
        top = -1;
    }

    void push(int x)
    {
        a[++top] = x;
    }

    void pop()
    {
        top--;
    }

    int peek()
    {
        return a[top];
    }

    bool safe(int row, int col)
    {
        for(int i=0; i<row; i++)
        {
            if(a[i] == col ||
              abs(a[i]-col) == abs(i-row))
                return false;
        }

        return true;
    }

    bool solve(int row)
    {
        if(row == 8)
            return true;

        for(int col=0; col<8; col++)
        {
            if(safe(row,col))
            {
                push(col);

                if(solve(row+1))
                    return true;

                pop();
            }
        }

        return false;
    }

    void display()
    {
        for(int i=0; i<8; i++)
        {
            for(int j=0; j<8; j++)
            {
                if(a[i] == j)
                    cout<<"Q ";
                else
                    cout<<". ";
            }

            cout<<endl;
        }
    }
};

int main()
{
    Stack s;

    if(s.solve(0))
    {
        cout<<"Solution of 8 Queens:\n";
        s.display();
    }
    else
        cout<<"No solution found!";

    return 0;
}







//7th
7





#include <iostream>
using namespace std;

class Tower
{
public:
    Tower()
    {
    }

    void solve(int n, char source, char aux, char dest)
    {
        if(n == 1)
        {
            cout << "Move disk 1 from " << source << " to " << dest << endl;
            return;
        }

        solve(n-1, source, dest, aux);

        cout << "Move disk " << n << " from "
             << source << " to " << dest << endl;

        solve(n-1, aux, source, dest);
    }
};

int main()
{
    int n;

    cout << "Enter number of disks: ";
    cin >> n;

    if(n <= 0)
    {
        cout << "Invalid number of disks";
        return 0;
    }

    Tower t;
    t.solve(n, 'A', 'B', 'C');

    return 0;
}









//8th
8





#include<iostream>
using namespace std;

class PriorityQueue
{
    int id[10], priority[10], n;

public:

    PriorityQueue()
    {
        n = 0;
    }

    void enqueue(int x, int p)
    {
        if(n == 10)
            cout<<"Queue Overflow"<<endl;
        else if(p < 1 || p > 3)
            cout<<"Invalid Priority"<<endl;
        else
        {
            int i = n-1;

            while(i >= 0 && priority[i] > p)
            {
                id[i+1] = id[i];
                priority[i+1] = priority[i];
                i--;
            }

            id[i+1] = x;
            priority[i+1] = p;
            n++;

            cout<<"Patient Added Successfully"<<endl;
        }
    }

    void dequeue()
    {
        if(n == 0)
            cout<<"Queue Underflow"<<endl;
        else
        {
            cout<<"Treated Patient: "<<id[0]<<endl;

            for(int i=0; i<n-1; i++)
            {
                id[i] = id[i+1];
                priority[i] = priority[i+1];
            }

            n--;
        }
    }

    void peek()
    {
        if(n == 0)
            cout<<"Queue is Empty"<<endl;
        else
            cout<<"Next Patient: "<<id[0]<<endl;
    }

    void display()
    {
        if(n == 0)
            cout<<"Queue is Empty"<<endl;
        else
        {
            cout<<"Patient ID\tPriority"<<endl;

            for(int i=0; i<n; i++)
                cout<<id[i]<<"\t\t"<<priority[i]<<endl;
        }
    }
};

int main()
{
    PriorityQueue q;
    int ch, id, p;

    do
    {
        cout<<"\n1. Enqueue";
        cout<<"\n2. Dequeue";
        cout<<"\n3. Peek";
        cout<<"\n4. Display";
        cout<<"\n5. Exit";

        cout<<"\nEnter Choice: ";
        cin>>ch;

        switch(ch)
        {
            case 1:
                cout<<"Enter Patient ID: ";
                cin>>id;

                cout<<"Enter Priority (1-3): ";
                cin>>p;

                q.enqueue(id,p);
                break;

            case 2:
                q.dequeue();
                break;

            case 3:
                q.peek();
                break;

            case 4:
                q.display();
                break;

            case 5:
                cout<<"Program Ended";
                break;

            default:
                cout<<"Invalid Choice";
        }

    }while(ch != 5);

    return 0;
}







//9th
9






#include<iostream>
using namespace std;

class Scheduling
{
    int pid[50], at[50], bt[50];
    int ct[50], tat[50], wt[50];
    int n;

public:

    Scheduling()
    {
        n = 0;
    }

    void input()
    {
        cout<<"Enter number of processes: ";
        cin>>n;

        if(n <= 0 || n > 50)
        {
            cout<<"Invalid number of processes"<<endl;
            n = 0;
            return;
        }

        for(int i=0; i<n; i++)
        {
            pid[i] = i+1;

            cout<<"Enter Arrival Time of P"<<pid[i]<<": ";
            cin>>at[i];

            cout<<"Enter Burst Time of P"<<pid[i]<<": ";
            cin>>bt[i];
        }
    }

    void display(string title)
    {
        float totalWT = 0, totalTAT = 0;

        cout<<"\n"<<title<<endl;

        cout<<"\nPID\tAT\tBT\tCT\tTAT\tWT\n";

        for(int i=0; i<n; i++)
        {
            cout<<"P"<<pid[i]<<"\t"
                <<at[i]<<"\t"
                <<bt[i]<<"\t"
                <<ct[i]<<"\t"
                <<tat[i]<<"\t"
                <<wt[i]<<endl;

            totalWT += wt[i];
            totalTAT += tat[i];
        }

        cout<<"\nAverage Waiting Time: "
            <<totalWT/n;

        cout<<"\nAverage Turnaround Time: "
            <<totalTAT/n<<endl;
    }

    void fcfs()
    {
        int time = 0;

        for(int i=0; i<n; i++)
        {
            if(time < at[i])
                time = at[i];

            time = time + bt[i];

            ct[i] = time;
            tat[i] = ct[i] - at[i];
            wt[i] = tat[i] - bt[i];
        }

        display("FCFS NON-PREEMPTIVE SCHEDULING");
    }

    void sjf()
    {
        int completed[50] = {0};
        int time = 0;
        int count = 0;

        while(count < n)
        {
            int minBT = 9999;
            int pos = -1;

            for(int i=0; i<n; i++)
            {
                if(completed[i] == 0 && at[i] <= time)
                {
                    if(bt[i] < minBT)
                    {
                        minBT = bt[i];
                        pos = i;
                    }
                }
            }

            if(pos == -1)
            {
                time++;
                continue;
            }

            time = time + bt[pos];

            ct[pos] = time;
            tat[pos] = ct[pos] - at[pos];
            wt[pos] = tat[pos] - bt[pos];

            completed[pos] = 1;
            count++;
        }

        display("SJF NON-PREEMPTIVE SCHEDULING");
    }
};

int main()
{
    Scheduling s;

    s.input();

    if(s.n == 0)
        return 0;

    s.fcfs();
    s.sjf();

    return 0;
}







//10th
10
palindrome






#include<iostream>
#include<string>
using namespace std;

class Deque
{
    char a[100];
    int front, rear;

public:

    Deque()
    {
        front = -1;
        rear = -1;
    }

    void insertRear(char x)
    {
        if(rear == 99)
            cout<<"Deque Overflow";
        else
        {
            if(front == -1)
                front = 0;

            a[++rear] = x;
        }
    }

    bool checkPalindrome(string s)
    {
        if(s.length() > 100)
            return false;

        for(int i=0; i<s.length(); i++)
        {
            insertRear(s[i]);
        }

        while(front < rear)
        {
            if(a[front] != a[rear])
                return false;
            else
            {
                front++;
                rear--;
            }
        }

        return true;
    }
};

int main()
{
    Deque d;
    string s;

    cout<<"Enter a string: ";
    cin>>s;

    if(d.checkPalindrome(s))
        cout<<"String is Palindrome";
    else
        cout<<"String is Not Palindrome";

    return 0;
}







// // //11
11






#include<iostream>
using namespace std;

string name[50];
string mob[50];
int n;

void Insert(string key,string moB){
    int i=n-1;
    while(i>=0 && name[i]>key){
        name[i+1]=name[i];
        mob[i+1]=mob[i];
        i--;
    }
    name[i+1]=key;
    mob[i+1]=moB;
    n++;

};
int Search(string key){

    if(n==0){
        return -1;
    }

    else{
        string last=name[n-1];
        name[n-1]=key;
        int i=0;

        while(name[i]!=key){
            i++;
        }

        name[n-1]=last;

        if(i<n-1 || last==key){
            return i;
        }
        else{
            return -1;
        }
    }


};
void Display(){

    if(n==0){
        cout <<"Empty";
    }
    for(int i=0;i<n;i++){
        cout <<name[i]<<"   "<<mob[i];
    }

};
int main(){

    int count;
    string k,m;
    cout <<"Enter No. Of Friends :- ";
    cin >>count;

    for(int i=0;i<count;i++){
        cout <<"Enter Name Of Friend :-";
        cin >>k;

        int pos=Search(k);
        if(pos==-1){
            cout <<"Enter Mobile No. Of Friend :-";
            cin >>m;

            Insert(k,m);

        }
        else{
            cout<< "Friend Is Already Present";
        }
    }

    string searchkey;
    cout <<"Enter Search Key :-";
    cin >>searchkey;

    int pos1=Search(searchkey);
        if(pos1==-1){
            cout <<"Enter Name Of Friend :-";
            cin >>k;
            cout <<"Enter Mobile No. Of Friend :-";
            cin >>m;

            Insert(searchkey,m);

        }
        else{
            cout<< "Friend Is Already Present";
            cout <<"Mobile No. Of Friend :-"<<mob[pos1];
        }
return 0;
    }






//12th
12
merge








#include<iostream>
using namespace std;

class MergeSort
{
    float a[50], temp[50];
    int n;
public:

    MergeSort()
    {
        n = 0;
    }

    void input()
    {
        cout<<"Enter number of students: ";
        cin>>n;
        if(n <= 0 || n > 50)
        {
            cout<<"Invalid number of students"<<endl;
            n = 0;
        }
        else
        {
            for(int i=0; i<n; i++)
            {
                cout<<"Enter percentage of student "<<i+1<<": ";
                cin>>a[i];
            }
        }
    }

    void merge(int low, int mid, int high)
    {
        int i = low;
        int j = mid+1;
        int k = low;

        while(i <= mid && j <= high)
        {
            if(a[i] <= a[j])
                temp[k++] = a[i++];
            else
                temp[k++] = a[j++];
        }

        while(i <= mid)
            temp[k++] = a[i++];
        while(j <= high)
            temp[k++] = a[j++];
        for(int i=low; i<=high; i++)
            a[i] = temp[i];
    }

    void sort(int low, int high)
    {
        if(low < high)
        {
            int mid = (low+high)/2;
            sort(low, mid);
            sort(mid+1, high);
            merge(low, mid, high);
        }
    }

    void display()
    {
        if(n == 0)
            cout<<"No data available"<<endl;
        else
        {
            cout<<"\nPercentages in Ascending Order:\n";
            for(int i=0; i<n; i++)
                cout<<a[i]<<" "; 
            cout<<endl;
        }
    }

    void performSort()
    {
        if(n > 0)
            sort(0, n-1);
    }
};

int main()
{
    MergeSort m;

    m.input();

    m.performSort();

    m.display();

    return 0;
}







//13th
13







#include<iostream>
using namespace std;

class Node
{
public:
    int data;
    Node *next;

    Node()
    {
        data = 0;
        next = NULL;
    }
};

class HashTable
{
    Node *table[12];

public:

    HashTable()
    {
        for(int i = 0; i < 12; i++)
        {
            table[i] = NULL;
        }
    }

    void insert(int key)
    {
        int index = key % 12;

        Node *newNode = new Node;
        newNode->data = key;

        if(table[index] == NULL)
        {
            table[index] = newNode;
        }
        else
        {
            Node *temp = table[index];

            while(temp->next != NULL)
            {
                temp = temp->next;
            }

            temp->next = newNode;
        }
    }

    void display()
    {
        cout << "\nHash Table:\n";

        for(int i = 0; i < 12; i++)
        {
            cout << i << " -> ";

            Node *temp = table[i];

            while(temp != NULL)
            {
                cout << temp->data << " -> ";
                temp = temp->next;
            }

            cout << "NULL" << endl;
        }
    }
};

int main()
{
    HashTable h;

    int a[12] = {10, 5, 4, 14, 15, 20,
                 1, 11, 6, 16, 36, 28};

    for(int i = 0; i < 12; i++)
    {
        h.insert(a[i]);
    }

    h.display();

    return 0;
}








//14th
14






#include<iostream>
using namespace std;

class HashTable
{
    int a[9];

public:

    HashTable()
    {
        for(int i = 0; i < 9; i++)
        {
            a[i] = -1;
        }
    }

    void insert(int key)
    {
        int index = key % 9;
        int i = index;

        while(a[i] != -1)
        {
            i = (i + 1) % 9;

            if(i == index)
            {
                cout << "Hash Table is Full!" << endl;
                return;
            }
        }

        a[i] = key;
    }

    void display()
    {
        cout << "\nHash Table:\n";

        for(int i = 0; i < 9; i++)
        {
            cout << i << " -> ";

            if(a[i] == -1)
                cout << "EMPTY";
            else
                cout << a[i];

            cout << endl;
        }
    }
};

int main()
{
    HashTable h;
    int n, key;

    cout << "Enter number of medicines: ";
    cin >> n;

    if(n < 1 || n > 9)
    {
        cout << "Invalid number";
        return 0;
    }

    for(int i = 0; i < n; i++)
    {
        cout << "Enter medicine key: ";
        cin >> key;

        if(key < 0)
        {
            cout << "Enter non-negative key" << endl;
            i--;
        }
        else
        {
            h.insert(key);
        }
    }

    h.display();

    return 0;
}





