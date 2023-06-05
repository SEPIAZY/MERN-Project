import bearbrick from '../model/bearbrick.model.js'

/** POST: http://localhost:8080/api/additem 
 * @param : {
  "name" : "bearbrick",
  "type" : "artist",
  "size" : "1000%",
  "image" : "https://image.goxip.com/4_4Ofzr4kUBraPRKGLlTtZigULU=/fit-in/500x500/filters:format(jpg):quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2Fimages%2FBearbrick-Pikachu-100-400-Set-Gold-Chrome-Ver.jpg"
}
*/
export async function addItem(req, res){
    const newBearbrick = new bearbrick(req.body);
    console.log(req.body);
    newBearbrick.save().then(() => res.json('Bearbrick added!')).catch((err) => {console.log(err)});
      
}

/** DELETE: http://localhost:8080/api/deleteitem
*/

export async function deleteItem(req, res) {
    try {
      const itemId = req.params.id;
      // Find the item by ID and remove it
      const deletedItem = await bearbrick.findByIdAndRemove(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ msg: "Item not found" });
      }
  
      return res.status(200).json({ msg: "Item deleted successfully", deletedItem });
    } 
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

/** GET: http://localhost:8080/api/getitem
 */
export async function getAllItems(req, res) {
    try {
      // Fetch all items from the database
      const items = await bearbrick.find();

      return res.status(200).json({ items });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
} 

/** PUT: http://localhost:8080/api/updateitem
 * @param : {
  "name" : "bearbrick",
  "type" : "artist",
  "size" : "1000%",
  "image" : "https://image.goxip.com/4_4Ofzr4kUBraPRKGLlTtZigULU=/fit-in/500x500/filters:format(jpg):quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2Fimages%2FBearbrick-Pikachu-100-400-Set-Gold-Chrome-Ver.jpg",
  "published" : ""
}
*/
export async function updateItem(req, res) {
    try {
      const itemId = req.params.id;
      const updatedData = req.body;
  
      // Find the item by ID and update it
      const updatedItem = await bearbrick.findByIdAndUpdate(itemId, updatedData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ msg: "Item not found" });
      }
  
      return res.status(200).json({ msg: "Item updated successfully", updatedItem });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

/** GET: http://localhost:8080/api/getAllCards
 * @param : {
 * "name" : "BEARBRICK Jean"
 * }
 */

const handleCardSearchResponse = (promise, res, errorMessage) => {
  promise
  .then((cards) => {
    // Map the cards to include only the required fields
    const filteredCards = cards.map(({ _id, name, type, image, size, createdAt }) => ({
      _id,
      name,
      type,
      image,
      size,
      createdAt
    }));
    res.json(filteredCards);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: errorMessage });
    });
};

const createFilters = (req) => {
  const filters = {};

  [ 'name', 'type', 'size', 'createdAt'].forEach((field) => {
    if (req.query[field]) {
      filters[field] = req.query[field].trim();
    }
  });

  if (req.query.name) {
    // Create a case-insensitive regex to filter by name
    filters.name = { $regex: new RegExp(req.query.name, 'i') };
  }

  if (req.query.type) {
    const types = req.query.type.split(',').map((type) => type.trim());
    filters.type = types;
  }

  if (req.query.size) {
    const sizes = req.query.size.split(',').map((size) => size.trim());
    filters.size = sizes;
  }

  return filters;
};

export async function getAllCards(req, res) {
  
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  const filters = createFilters(req);
  handleCardSearchResponse(
        bearbrick.find(filters)
          .skip(offset)
          .sort({ createdAt: -1 })
          .limit(limit),
        res,
        "An error occurred while fetching matching items."
      );

  // const limit = parseInt(req.query.limit) || 100;
  // const offset = parseInt(req.query.offset) || 0;
  // const filters = createFilters(req);

  // try {
  //   const cards = await bearbrick.find(filters)
  //     .select('_id name type image size createdAt')
  //     .sort({ createdAt: -1 })
  //     .skip(offset)
  //     .slice(offset, offset + limit)
  //     .lean();

  //   res.json(cards);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'An error occurred while fetching matching items.' });
  // }
};