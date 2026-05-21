const Event = require('../models/Events');
// Get all events
exports.getAllEvents = async (req, res) => {    
    try {
        const filters={};
        if(req.query.category){
            filters.category=req.query.category;
        }
       if(req.query.ticketPrice){
            filters.ticketPrice={$lte:req.query.ticketPrice};
        }       
        const events = await Event.find(filters).populate('createdBy', 'name email')    ;
        res.status(200).json(events);
    }   

    catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Get event by ID
exports.getEventById = async (req, res) => {
    try {       

        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
};
// Create a new event
exports.createEvent = async (req, res) => {
    try {   
        const { title, description, date, location, category, ticketPrice, image, createdBy } = req.body;
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            category,
            totalSeats: 100,
            availableSeats: 100,

            ticketPrice,
            imageUrl: image,
            createdBy: req.user._id
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};
// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }   
        const { title, description, date, location, category, ticketPrice } = req.body;
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.category = category || event.category;
        event.ticketPrice = ticketPrice || event.ticketPrice;
        const updatedEvent = await event.save();    
        res.status(200).json(updatedEvent);
    }   
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {               
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await event.remove();
        res.status(200).json({ message: 'Event deleted successfully' });
    }               
    catch (error) { 
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   



