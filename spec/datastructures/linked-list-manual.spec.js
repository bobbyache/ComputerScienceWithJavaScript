describe("LinkedList", () => {
    var LinkedList = require('./linked-list-manual');

    var linkedList;

    beforeEach(() => {
        linkedList = new LinkedList(4);
    });

    it("should push a new  value correctly", () => {
        linkedList.push(2);

        expect(linkedList.length).toBe(2);
        expect(linkedList.head.value).toBe(4);
        expect(linkedList.tail.value).toBe(2);
    });

    it("should pop a two node list correctly", () => {
        linkedList.push(2);
        linkedList.pop();

        expect(linkedList.length).toBe(1);
        expect(linkedList.head.value).toBe(4);
        expect(linkedList.tail.value).toBe(4);
    });

    it("should pop a single node list correctly", () => {
        linkedList.pop();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should pop a zero node list correctly", () => {
        linkedList.pop();
        linkedList.pop();

        expect(linkedList.length).toBe(0);
        expect(linkedList.head).toBe(null);
        expect(linkedList.tail).toBe(null);
    });

    it("should unshift correctly", () => {
        linkedList.unshift(5);

        expect(linkedList.length).toBe(2);
        expect(linkedList.head.value).toBe(5);
        expect(linkedList.tail.value).toBe(4);
    });
});
