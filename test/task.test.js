const { expect } = require('chai'); 
// expect, should  => BDD
// assert => TDD
const chai = require('chai');
const chaiHttp = require('chai-http'); // supertest, 
const server = require('../index');
// note: assertions style
chai.should();
chai.use(chaiHttp);
//* testing
describe('/api/task', () => {
	// note: GET
	describe('GET', () => {
		it('It should get all task', (done) => {
			chai
				.request(server)
				.get('/api/task')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					response.body.length.should.be.equal(3);
					done();
				});
		});

		it('Should return 404 status', (done) => {
			chai
				.request(server)
				.get('/api/taks')
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.be.a('object');
					done();
				});
		});
	});
	// note: GET by id
	describe('GET by ID', () => {
		it('Should get task by ID', (done) => {
			const taskid = 2;
			chai
				.request(server)
				.get('/api/task/' + taskid)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('id');
					response.body.should.have.property('name');
					response.body.should.have.property('completed');
					response.body.should.have.property('id').eq(taskid);
					done();
				});
		});

		it('Should return 404 status', (done) => {
			chai
				.request(server)
				.get('/api/task/5')
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.be.a('object');
					done();
				});
		});
	});
	// note: POST
	describe('POST', () => {
		it('should create task', (done) => {
			const task = {
				name: 'Task 4',
				completed: false,
			};
			chai
				.request(server)
				.post('/api/task')
				.send(task)
				.end((err, response) => {
					response.should.have.status(201);
					response.body.should.be.a('object');
					response.body.data.should.have.property('id');
					response.body.data.should.have.property('name');
					response.body.data.should.have.property('completed');
					response.body.data.should.have.property('name').eq(task.name);
					response.body.data.should.have
						.property('completed')
						.eq(task.completed);
					done();
				});
			//
		});
		// note: name missing
		it('should return 400 (name missing)', (done) => {
			const task = {
				completed: false,
			};
			chai
				.request(server)
				.post('/api/task')
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
		});
		// note: name too small
		it('should return 400 (name too small)', (done) => {
			const task = {
				name: 'ab',
				completed: false,
			};
			chai
				.request(server)
				.post('/api/task')
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
			//
		});
	});
	// note: PUT
	describe('PUT', () => {
		it('should update task', (done) => {
			const task = {
				name: 'Task 4',
				completed: false,
			};
			const taskId = 2;
			chai
				.request(server)
				.put('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.data.should.have.property('id');
					response.body.data.should.have.property('name');
					response.body.data.should.have.property('completed');
					response.body.data.should.have.property('name').eq(task.name);
					response.body.data.should.have.property('id').eq(taskId);
					response.body.data.should.have
						.property('completed')
						.eq(task.completed);
					done();
				});
			//
		});
		it('should return 404 status', (done) => {
			const task = {
				name: 'Task 4',
				completed: false,
			};
			const taskId = 4;
			chai
				.request(server)
				.post('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.be.a('object');
					done();
				});
			//
		});
		// note: name missing
		it('should return 400 (name missing)', (done) => {
			const task = {
				completed: false,
			};
			const taskId = 2;
			chai
				.request(server)
				.put('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
		});
		// note: name too small
		it('should return 400 (name too small)', (done) => {
			const task = {
				name: 'ab',
				completed: false,
			};
			const taskId = 2;
			chai
				.request(server)
				.put('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
			//
		});
	});
	// note: PATCH
	describe('PATCH', () => {
		it('should patch task', (done) => {
			const taskId = 2;
			const task = {
				name: 'Task x',
				completed: true,
			};
			chai
				.request(server)
				.patch('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.status.should.be.equal(200);
					response.body.should.be.an('object');
					response.body.should.not.be.a('array');
					response.body.data.should.have.property('id').equal(taskId);
					response.body.data.should.have.property('name').equal(task.name);
					response.body.data.should.have.property('name');
					response.body.data.should.have.property('completed');
					done();
				});
		});

		it('should return 404status', (done) => {
			const taskId = 40;
			const task = {
				name: 'Task x',
				completed: true,
			};
			chai
				.request(server)
				.patch('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.status.should.equal(404);
					response.body.should.be.an('object');
					done();
				});
		});
		// note: name missing
		it('should return 400 (name missing)', (done) => {
			const task = {
				completed: false,
			};
			const taskId = 2;
			chai
				.request(server)
				.patch('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
		});
		// note: name too small
		it('should return 400 (name too small)', (done) => {
			const task = {
				name: 'ab',
			};
			const taskId = 2;
			chai
				.request(server)
				.patch('/api/task/' + taskId)
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq('Name should be atleast 3 characters longs');
					done();
				});
			//
		});
	});
	// note: DELETE
	describe('DELETE', () => {
		it('should delete task', (done) => {
			const taskId = 2;
			chai
				.request(server)
				.delete('/api/task/' + taskId)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.data.should.have.property('id').eq(taskId);
					response.body.data.should.have.property('name');
					response.body.data.should.have.property('completed');
					done();
				});
		});

		it('should return 400', (done) => {
			const taskId = 40;
			chai
				.request(server)
				.delete('/api/task/' + taskId)
				.end((err, response) => {
					response.should.have.status(404);
					response.body.should.be.a('object');
					response.body.should.have
						.property('message')
						.eq("Task with given ID don't exists");
					done();
				});
		});
	});
});
