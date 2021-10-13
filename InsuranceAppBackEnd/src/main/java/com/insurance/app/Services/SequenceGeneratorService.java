package com.insurance.app.Services;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import org.springframework.stereotype.Service;

import com.insurance.app.modal.UserSequence;


@Service
public class SequenceGeneratorService {

	private MongoOperations mongoOperations;
	
	@Autowired
    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }
	
	public long generateSequence(String seqName) {

		UserSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",5), options().returnNew(true).upsert(true),
                UserSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
