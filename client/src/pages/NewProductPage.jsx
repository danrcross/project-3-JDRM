import Header from "../components/Header";
import Footer from "../components/Footer";
import sampPic from "../assets/images/parsnips.png";
export default function NewProductPage() {
  return (
    <div className="newItemPage">
      <Header />
      <h1 className="pageTitle">New Product</h1>
      <div className="newItemDiv">
        {/* Below is the form to upload a new Profile Photo */}
        <form className="newItemForm">
          <label className="newItemLabel" htmlFor="prodPic">
            Product Photo
          </label>
          <div className="itemPicBox">
            <img className="itemPic" alt="comm-pic" src={sampPic}></img>
            <div className="itemPicForm">
              <label htmlFor="ncPicUrl">Enter a link...</label>
              <input
                type="url"
                id="ncPicUrl"
                name="ncPicUrl"
                className="itemInputShort"
              ></input>
            </div>
          </div>
          <label className="newItemLabel">Product Name</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="commName"
              name="commName"
            ></input>
          </div>

          <label className="newItemLabel">Price</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="location"
              name="location"
            ></input>
          </div>
          <label className="newItemLabel">Condition</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="location"
              name="location"
            ></input>
          </div>
          <label className="newItemLabel">Description</label>
          <div className="inputWrapper">
            <input
              className="itemInputLong"
              type="text"
              id="location"
              name="location"
            ></input>
          </div>
          <input className="submitBtn" type="submit" value="Add Product" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
