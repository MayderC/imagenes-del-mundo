import CardImage from "@/components/CardImage.vue";
import { mount } from "@vue/test-utils";
import { IImageDTO } from "./../../../src/interfaces/image.interface";

describe("Test CardImage component", () => {
  it("checking if emit an event when like button is clicked,if img is in src and if sellerID was send from emit", async () => {
    const imgProp: IImageDTO = {
      id: "1",
      sellerID: 3,
      urls: {
        full: "",
        raw: "",
        regular: "",
        small: "Test",
        thumb: "",
      },
    };

    const wrapper = mount(CardImage, {
      props: {
        image: imgProp,
      },
    });

    const imdDom = wrapper.find("img").attributes();
    await wrapper.find("button").trigger("click");

    expect(imdDom["src"]).toBe(imgProp.urls.small);
    expect(wrapper.emitted()["like"][0]).toEqual([imgProp.sellerID]);
  });
});
