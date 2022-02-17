class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = this.head;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) {
            return this;
        } else if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
            this.length--;
        } else {
            let previousNode = null;
            let currentNode = this.head;
            while (currentNode.next) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            this.tail = previousNode;
            previousNode.next = null;

            this.length--;
        }
        return this;
    }

    unshift(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
}

module.exports = Node;
module.exports = LinkedList;
