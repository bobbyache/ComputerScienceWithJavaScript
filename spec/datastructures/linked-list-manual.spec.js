describe("LinkedList", () => {
    var LinkedList = require('./linked-list-manual');

    var linkedList;

    it("should push a new  value correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.push(2);

        expect(linkedList.length).toBe(2);
        expect(linkedList.head.value).toBe(4);
        expect(linkedList.tail.value).toBe(2);
    });

    it("should pop a two node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.push(2);
        linkedList.pop();

        expect(linkedList.length).toBe(1);
        expect(linkedList.head.value).toBe(4);
        expect(linkedList.tail.value).toBe(4);
    });

    it("should pop a single node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.pop();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should pop a zero node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.pop();
        linkedList.pop();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should unshift correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.unshift(5);

        expect(linkedList.length).toBe(2);
        expect(linkedList.head.value).toBe(5);
        expect(linkedList.tail.value).toBe(4);
    });

    it("should unshift first item", () => {
        linkedList = new LinkedList(4);
        linkedList.pop(); // should not be no nodes
        linkedList.unshift(5);

        expect(linkedList.length).toBe(1);
        expect(linkedList.head.value).toBe(5);
        expect(linkedList.tail.value).toBe(5);
    });

    it("should shift correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.push(3);
        linkedList.push(2);
        linkedList.push(1);

        linkedList.shift();

        expect(linkedList.length).toBe(3);
        expect(linkedList.head.value).toBe(3);
        expect(linkedList.tail.value).toBe(1);
    });

    it("should shift a 2 node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.push(3);

        linkedList.shift();

        expect(linkedList.length).toBe(1);
        expect(linkedList.head.value).toBe(3);
        expect(linkedList.tail.value).toBe(3);
    });

    it("should shift single node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.shift();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should shift an empty node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.pop(); // list is now empty
        linkedList.shift();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should shift an empty node list correctly", () => {
        linkedList = new LinkedList(4);
        linkedList.pop(); // list is now empty
        var result = linkedList.shift();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);

        expect(result).toBeUndefined();
    });

    it("should get an node at an index at the end of the list", () => {
        linkedList = new LinkedList(0);
        linkedList.push(1);
        linkedList.push(2);
        linkedList.push(3);
        linkedList.push(4);

        var node = linkedList.get(4);
        expect(node.value).toBe(4);
    });

    it("should get an node at an index at the beginning of the list", () => {
        linkedList = new LinkedList(0);
        linkedList.push(1);
        linkedList.push(2);
        linkedList.push(3);
        linkedList.push(4);

        var node = linkedList.get(0);
        expect(node.value).toBe(0);
    });

    it("should get an node at an index somewhere within the list", () => {
        linkedList = new LinkedList(0);
        linkedList.push(1);
        linkedList.push(2);
        linkedList.push(3);
        linkedList.push(4);

        var node = linkedList.get(3);
        expect(node.value).toBe(3);
    });

    it("should return undefined if outside the upper bounds of the list", () => {
        linkedList = new LinkedList(0);
        linkedList.push(1);
        linkedList.push(2);
        linkedList.push(3);
        linkedList.push(4);

        var node = linkedList.get(5);
        expect(node).toBeUndefined();
    });

    it("should return undefined if outside the lower bounds of the list", () => {
        linkedList = new LinkedList(0);
        linkedList.push(1);
        linkedList.push(2);
        linkedList.push(3);
        linkedList.push(4);

        var node = linkedList.get(-1);
        expect(node).toBeUndefined();
    });
});
