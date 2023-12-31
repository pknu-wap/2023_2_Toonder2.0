package com.toonder.backend.board;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Integer>{

	List<Board> findAllByOrderByBrdNoDesc(Pageable pageable);
	
	public final static String SELECT_BOARD_LIST_PAGED = ""
			+ "SELECT "
			+ "brdNo,"
			+ "brdTitle,"
			+ "brdContent,"
            + "brdRegDate,"
            + "brdUpdateDate,"
			+ "brdViewCount,"
			+ "brdLike,"
			+ "mem_email"
			+ " FROM board WHERE 0 < brdNo "
			+ "ORDER BY brdNo DESC LIMIT ?1, ?2";
	
	

	@Query(value = SELECT_BOARD_LIST_PAGED, nativeQuery = true)
	List<Board> findFromTo(
			final Integer objectStartNum,
			final Integer objectEndNum);

}
