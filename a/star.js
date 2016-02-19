function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

//Generators can be iterated over in loops:

for (n of fibonacci()) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    print(n);
}
