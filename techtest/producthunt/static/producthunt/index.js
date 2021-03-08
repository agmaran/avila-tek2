class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [], voted_products: [], voted_products_ids: [], date: new Date(), products_of_the_day: [] };
        this.showProduct = this.showProduct.bind(this);
        this.vote = this.vote.bind(this);
        this.unvote = this.unvote.bind(this);
        this.newer = this.newer.bind(this);
        this.older = this.older.bind(this);
        this.reminder = this.reminder.bind(this);
    }

    componentDidMount() {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`https://producthunttechtest.herokuapp.com/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 1
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })
            })
            .catch(e => {
                console.log(e);
            })
    }

    newer() {
        this.state.date.setDate(this.state.date.getDate() + 1);
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`https://producthunttechtest.herokuapp.com/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 1
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })

            })
            .catch(e => {
                console.log(e);
            })
    }

    older() {
        this.state.date.setDate(this.state.date.getDate() - 1);
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch(`https://producthunttechtest.herokuapp.com/products/${date}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.products)
                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 1
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })

            })
            .catch(e => {
                console.log(e);
            })

    }

    showProduct(event) {
        ReactDOM.render(<Product id={event.currentTarget.getAttribute("data-id")} day={event.currentTarget.getAttribute("data-day")} />, document.querySelector('#index'))
    }

    vote(event) {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch('https://producthunttechtest.herokuapp.com/vote', {
            method: 'POST',
            body: JSON.stringify({
                product_id: event.currentTarget.getAttribute("data-product"),
                date: date
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    window.location = '/login'
                } else {
                    var aux = []
                    if (result.voted_products !== null) {
                        result.voted_products.map((product) => {
                            aux.push(product.id)
                        })
                        this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                    } else {
                        this.setState({ products: result.products })
                    }
                    var counter = 1
                    var p = []
                    if (result.products !== null) {
                        result.products.map((product) => {
                            if (product.votes > counter) {
                                counter = product.votes
                                p = []
                                p.push(product)
                            }
                            if (product.votes === counter) {
                                p.push(product)
                            }
                        })
                    }
                    this.setState({ products_of_the_day: p })
                }
            })
    }

    unvote(event) {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        fetch('https://producthunttechtest.herokuapp.com/unvote', {
            method: 'POST',
            body: JSON.stringify({
                product_id: event.currentTarget.getAttribute("data-product"),
                date: date
            })
        })
            .then(response => response.json())
            .then(result => {

                var aux = []
                if (result.voted_products !== null) {
                    result.voted_products.map((product) => {
                        aux.push(product.id)
                    })
                    this.setState({ products: result.products, voted_products: result.voted_products, voted_products_ids: aux })
                } else {
                    this.setState({ products: result.products })
                }
                var counter = 1
                var p = []
                if (result.products !== null) {
                    result.products.map((product) => {
                        if (product.votes > counter) {
                            counter = product.votes
                            p = []
                            p.push(product)
                        }
                        if (product.votes === counter) {
                            p.push(product)
                        }
                    })
                }
                this.setState({ products_of_the_day: p })
            })
    }

    reminder() {
        ReactDOM.render(<Alert message="You can't vote because you are registered as founder." />, document.querySelector('#alert'))
    }

    render() {
        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate();
        let d = new Date()
        let today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        d.setDate(d.getDate() - 1);
        let yesterday = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        if (this.state.products.length > 0) {
            var products = this.state.products.map((product) => {
                return (
                    <div key={product.id} className="my_container row">
                        <img src={product.logo} className="col-2 h-100 pointer" onClick={this.showProduct} data-id={product.id} data-day={this.state.products_of_the_day.includes(product)} />
                        <div className="col-6 pointer" onClick={this.showProduct} data-id={product.id} data-day={this.state.products_of_the_day.includes(product)}>
                            <h3>{product.name}</h3>
                            <div>{product.description}</div>
                        </div>
                        {this.state.products_of_the_day.includes(product) && <div className="col-2"><span className="badge bg-warning text-dark">Product of the day</span></div>}
                        {!this.state.products_of_the_day.includes(product) && <div className="col-2"></div>}
                        <div className="col-2">
                            {!this.state.voted_products_ids.includes(product.id) && document.querySelector('#new-product-button') === null && <button type="button" className="btn btn-outline-secondary button-height" data-product={product.id} onClick={this.vote}>{product.votes} <i className="bi bi-star ml-3 mr-1 pointer"></i></button>}
                            {this.state.voted_products_ids.includes(product.id) && document.querySelector('#new-product-button') === null && <button type="button" className="btn btn-outline-danger button-height" data-product={product.id} onClick={this.unvote}>{product.votes} <i className="bi bi-star-fill ml-3 mr-1 pointer"></i></button>}
                            {document.querySelector('#username') !== null && document.querySelector('#new-product-button') !== null && <button type="button" className="btn btn-outline-dark button-height" onClick={this.reminder}>{product.votes} <i className="bi bi-star ml-3 mr-1 pointer"></i></button>}
                        </div>
                    </div>
                )
            })

            return (
                <div>
                    {date === today && <h3 className="padding">Today</h3>}
                    {date === yesterday && <h3 className="padding">Yesterday</h3>}
                    {date !== yesterday && date !== today && <h3 className="padding">{this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}</h3>}
                    {<div>{products}</div>}
                    {<nav aria-label="Page navigation example" className="col-12">
                        <ul className="pagination margin">
                            {!(date === today) && <li className="page-item"><a className="page-link pointer" onClick={this.newer}>Newer</a></li>}
                            <li className="page-item"><a className="page-link pointer" onClick={this.older}>Older</a></li>
                        </ul>
                    </nav>}
                </div>
            )
        } else {
            return (
                <div>
                    {date === today && <h3 className="padding">Today</h3>}
                    {date === yesterday && <h3 className="padding">Yesterday</h3>}
                    {date !== yesterday && date !== today && <h3 className="padding">{this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}</h3>}
                    <div className="margin">There were no products launched the {this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}.</div>
                    <nav aria-label="Page navigation example" className="col-12">
                        <ul className="pagination margin">
                            {!(date === today) && <li className="page-item"><a className="page-link pointer" onClick={this.newer}>Newer</a></li>}
                            <li className="page-item"><a className="page-link pointer" onClick={this.older}>Older</a></li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}

ReactDOM.render(<ProductList />, document.querySelector('#index'))

class NewProductButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.newProduct = this.newProduct.bind(this);
    }

    newProduct(event) {
        this.setState({ clicked: true })
        ReactDOM.render(<NewProductForm />, document.querySelector('#index'))
    }

    render() {

        return (
            <button className="new" onClick={this.newProduct}>New</button>
        )

    }
}

if (document.querySelector('#new-product-button') !== null) {
    ReactDOM.render(<NewProductButton />, document.querySelector('#new-product-button'))
}

class NewProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            logo: '',
            image1: '',
            image2: '',
            image3: '',
            link: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createProduct(event) {

        fetch('https://producthunttechtest.herokuapp.com/newproduct', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                logo: this.state.logo,
                image1: this.state.image1,
                image2: this.state.image2,
                image3: this.state.image3,
                link: this.state.link
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    ReactDOM.render(<Alert message={result.error} />, document.querySelector('#alert'))
                } else {
                    ReactDOM.render(<ProductList />, document.querySelector('#index'))
                }
            })

        event.preventDefault();

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="margin col-6">
                        <h3>New Product</h3>
                        <div className="form-group margin">
                            <input maxLength="50" name="name" className="form-control" autoFocus type="text" placeholder="Product Name" value={this.state.name} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input maxLength="100" name="description" className="form-control" type="text" placeholder="Short product description" value={this.state.description} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input name="logo" className="form-control" type="url" placeholder="Logo URL" value={this.state.logo} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input name="image1" className="form-control" type="url" placeholder="Image URL" value={this.state.image1} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input name="image2" className="form-control" type="url" placeholder="Image URL" value={this.state.image2} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input name="image3" className="form-control" type="url" placeholder="Image URL" value={this.state.image3} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group margin">
                            <input name="link" className="form-control" type="url" placeholder="Product link" value={this.state.link} onChange={this.handleInputChange} />
                        </div>
                        <input className="btn btn-primary" type="submit" value="Create" onClick={this.createProduct} />
                    </div>
                    <div className="col">
                        {this.state.logo !== '' && <img src={this.state.logo} className="w-100 h-50" />}
                        {this.state.logo === '' && <img src="https://www.lookatourworld.com/wp-content/uploads/2018/08/No-Image-Provided-1.png" className="w-100 h-50" />}
                        {this.state.image1 !== '' && <img src={this.state.image1} className="w-100 h-50" />}
                        {this.state.image1 === '' && <img src="https://www.lookatourworld.com/wp-content/uploads/2018/08/No-Image-Provided-1.png" className="w-100 h-50" />}
                    </div>
                    <div className="col">
                        {this.state.image2 !== '' && <img src={this.state.image2} className="w-100 h-50" />}
                        {this.state.image2 === '' && <img src="https://www.lookatourworld.com/wp-content/uploads/2018/08/No-Image-Provided-1.png" className="w-100 h-50" />}
                        {this.state.image3 !== '' && <img src={this.state.image3} className="w-100 h-50" />}
                        {this.state.image3 === '' && <img src="https://www.lookatourworld.com/wp-content/uploads/2018/08/No-Image-Provided-1.png" className="w-100 h-50" />}
                    </div>
                </div>
            </div>
        )
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: '' };
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        fetch(`https://producthunttechtest.herokuapp.com/product/${this.props.id}`)
            .then(response => response.json())
            .then(result => {
                console.log(result.product)
                this.setState({ product: result.product })
            })
            .catch(e => {
                console.log(e);
            })
    }

    goHome() {
        ReactDOM.render(<ProductList />, document.querySelector('#index'))
    }
    render() {
        return (
            <div>
                <button className="new" onClick={this.goHome}>X</button>
                <div className="row">

                    <img src={this.state.product.logo} className="col-2 h-100" />
                    <div className="col-8">
                        <h3>{this.state.product.name}</h3>
                        <div>{this.state.product.description}</div>
                    </div>
                    <div className="col-2">
                        {this.props.day === 'true' && <div ><span className="badge bg-warning text-dark">Product of the day</span></div>}
                        <a href={this.state.product.link} class="button3">GET IT</a>
                    </div>
                </div>
                <div className="row margin">
                    <img src={this.state.product.image1} className="col-4 h-150" />
                    <img src={this.state.product.image2} className="col-4 h-150" />
                    <img src={this.state.product.image3} className="col-4 h-150" />
                </div>

            </div>
        )
    }
}

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: true }
        this.dismiss = this.dismiss.bind(this);
    }

    dismiss() {
        this.setState({ show: false })
    }

    render() {
        if (this.state.show) {
            return (
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    {this.props.message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={this.dismiss}></button>
                </div>
            )
        }
    }
}