import { expect } from "chai";
import { readAll } from "mesh";
import { reader, Reader } from "./reader";

describe(__filename + "#", () => {
  it("can be called", () => {
    expect(reader((v: number) => v + 1).run(2)).to.eql(3);
  });

  it("can be chained together with andThen", () => {

    const rd = reader((v: number) => v + 1).bind((v: number) => (
      -v
    ));

    expect(rd.run(10)).to.eql(-11);
  });

  it("can return a reader in binds", () => {
    const rd = reader((v: number) => v + 1).bind((v: number) => reader((v2) => -v * v2));
    expect(rd.run(10)).to.eql(-110);
  });

  it("can return a reader in a few binds", () => {
    const fn = reader((a: string) => a + "b").bind((b) => reader((a) => b + a + "c")).bind((c) => reader((a) => c + a + "d"));
    expect(fn.run("a")).to.eql("abacad");
  });

  it("can handle promises", async () => {
    const fn = reader((v) => Promise.resolve(-v)).bind((v) => v - 2);
    expect(await fn.run(3)).to.eql(-5);
  });


  it("can pipe an async iterable iterator into a mapped value", async () => {
    const negate = reader(async function*(n: number) {
      for (let i = n; i--;) {
        yield i;
      }
    }).bind(readAll).bind((v) => v.map((i) => -i));
    expect(await negate.run(5)).to.eql([-4, -3, -2, -1, -0]);
  });

  describe("#utils", () => {

    /*
    
    const getHTTPRequest = (url) => reader({ httpServer }) => httpServer.once('get', url)));

    race(
      getHTTPRequest('get', '/index.html').bind((req) => )
    )
    */
    describe("#race", () => { 

    });
  });
});